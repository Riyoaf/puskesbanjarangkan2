'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addActivity(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string

  await supabase.from('activities').insert({
    title,
    date,
    location,
    description
  })

  revalidatePath('/dashboard/activities')
  revalidatePath('/') // Update landing page too
}

export async function deleteActivity(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('activities').delete().eq('id', id)

  revalidatePath('/dashboard/activities')
  revalidatePath('/')
}
