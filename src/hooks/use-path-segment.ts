import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Hook untuk memanipulasi segment URL path
 * @returns Object dengan utility untuk bekerja dengan path segments
 */
export function usePathSegments() {
  const pathname = usePathname();

  const result = useMemo(() => {
    const cleanPath = pathname.replace(/^\/+|\/+$/g, "");

    const segments = cleanPath.split("/");

    const basePath =
      segments.length > 1 ? "/" + segments.slice(0, -1).join("/") : "";

    return {
      raw: pathname,
      /**
       * Semua segment sebagai array
       */
      all: segments,

      // role
      role: segments[0],

      /**
       * Path lengkap tanpa perubahan
       */
      fullPath: pathname,

      /**
       * Path tanpa segment terakhir
       * Contoh: /dashboard/admin/penduduk/ddda9ba1-33b4-4958-b123-bd71d4eb62af
       */
      basePath,

      /**
       * Path tanpa N segment terakhir
       * @param n - Jumlah segment dari akhir yang akan dihapus
       */
      getPathWithoutLast: (n: number = 1) => {
        if (segments.length <= n) return "/";
        return "/" + segments.slice(0, -n).join("/");
      },

      /**
       * Segment terakhir
       */
      lastSegment: segments.length > 0 ? segments[segments.length - 1] : "",

      /**
       * Segment pada indeks tertentu
       * @param index - Indeks segment (0-based)
       */
      getSegment: (index: number) => segments[index] || "",

      /**
       * Jumlah segment
       */
      length: segments.length,

      /**
       * Ganti segment terakhir dengan nilai baru
       * @param newLastSegment - Segment baru untuk menggantikan yang terakhir
       * @returns Path baru dengan segment terakhir diganti
       */
      replaceLastSegment: (newLastSegment: string) => {
        if (segments.length === 0) return `/${newLastSegment}`;
        return "/" + [...segments.slice(0, -1), newLastSegment].join("/");
      },

      /**
       * Ganti segment pada indeks tertentu
       * @param index - Indeks segment yang akan diganti (0-based)
       * @param newSegment - Segment baru
       * @returns Path baru dengan segment yang diganti
       */
      replaceSegment: (index: number, newSegment: string) => {
        if (index < 0 || index >= segments.length) return pathname;
        const newSegments = [...segments];
        newSegments[index] = newSegment;
        return "/" + newSegments.join("/");
      },

      /**
       * Tambah segment baru di akhir
       * @param newSegment - Segment baru yang akan ditambahkan
       * @returns Path baru dengan segment tambahan
       */
      appendSegment: (newSegment: string) => {
        return "/" + [...segments, newSegment].join("/");
      },

      /**
       * Cek apakah path memiliki segment tertentu
       * @param segment - Segment yang dicari
       * @returns true jika segment ditemukan
       */
      hasSegment: (segment: string) => segments.includes(segment),
    };
  }, [pathname]);

  return result;
}
