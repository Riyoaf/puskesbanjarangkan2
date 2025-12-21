'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateRegistrationStatus(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  
  // Logic to set next Monday if approved
  let scheduled_date = null
  if (status === 'approved') {
    const today = new Date()
    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
    // If today is Monday, schedule for next week or today? Let's say next week for simplicity or today if early.
    // Requirement says "imunisasi hanya dilakukan di hari senin saja".
    // Let's just pick the next coming Monday.
    if (today.getDay() === 1) { // It is Monday
        // Schedule for today? Or next week? Let's assume next week to be safe/prepared.
        nextMonday.setDate(nextMonday.getDate() + 7)
    }
    scheduled_date = nextMonday.toISOString()
  }

  await supabase
    .from('registrations')
    .update({ 
      status,
      ...(scheduled_date && { scheduled_date })
    })
    .eq('id', id)

  // Decrement stock if status is completed
  if (status === 'completed') {
    const { data: registration } = await supabase
      .from('registrations')
      .select('vaccine_id')
      .eq('id', id)
      .single()

    if (registration?.vaccine_id) {
      const { data: vaccine } = await supabase
        .from('vaccines')
        .select('stock')
        .eq('id', registration.vaccine_id)
        .single()
      
      if (vaccine) {
        await supabase
          .from('vaccines')
          .update({ stock: Math.max(0, vaccine.stock - 1) })
          .eq('id', registration.vaccine_id)
      }
    }
  }

  revalidatePath('/dashboard/registrations')
}
