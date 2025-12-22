'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email.endsWith('@gmail.com')) {
    return { error: 'Hanya email @gmail.com yang diperbolehkan' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check role to determine redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .single()

  const target = profile?.role === 'admin' ? '/dashboard' : '/'
  revalidatePath('/', 'layout')
  redirect(target)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  if (!email.endsWith('@gmail.com')) {
    return { error: 'Hanya email @gmail.com yang diperbolehkan' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Check if session exists (Email confirmation disabled)
  if (data.user && !data.session) {
    console.warn('User registered but no session created. "Confirm email" might be enabled in Supabase.')
  }

  // Force sign out to ensure user has to login manually
  await supabase.auth.signOut()

  redirect('/login?message=Registrasi berhasil, silakan login')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
