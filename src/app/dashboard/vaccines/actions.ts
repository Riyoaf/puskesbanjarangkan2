'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addVaccine(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const stock = parseInt(formData.get('stock') as string)
  const description = formData.get('description') as string

  await supabase.from('vaccines').insert({
    name,
    stock,
    description
  })

  revalidatePath('/dashboard/vaccines')
}

export async function updateStock(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const stock = parseInt(formData.get('stock') as string)

  await supabase.from('vaccines').update({ stock }).eq('id', id)

  revalidatePath('/dashboard/vaccines')
}

export async function deleteVaccine(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('vaccines').delete().eq('id', id)

  revalidatePath('/dashboard/vaccines')
}
