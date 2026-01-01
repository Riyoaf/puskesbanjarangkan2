/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

import { login, signup } from "@/app/auth/actions";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import styles from "./auth.module.css";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      toast.success(message);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("message");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [message]);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError(null);
      try {
        const action = isLogin ? login : signup;
        const result = await action(formData);

        if (result?.error) {
          setError(result.error);
        }
      } catch (error) {
        setError("Terjadi kesalahan pada server");
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isLogin ? "Login ke Puskesmas" : "Daftar Akun Baru"}
        </h1>

        <form action={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="fullName">Nama Lengkap</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                disabled={isPending}
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nama@gmail.com"
              pattern=".*@gmail\.com$"
              title="Harap gunakan email @gmail.com"
              disabled={isPending}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                minLength={6}
                disabled={isPending}
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isPending}>
                {showPassword ? (
                  <EyeSlashIcon style={{ width: 20, height: 20 }} />
                ) : (
                  <EyeIcon style={{ width: 20, height: 20 }} />
                )}
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Memproses...
              </>
            ) : isLogin ? (
              "Masuk"
            ) : (
              "Daftar"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              className={styles.linkBtn}
              onClick={() => setIsLogin(!isLogin)}
              disabled={isPending}>
              {isLogin ? "Daftar sekarang" : "Login disini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
