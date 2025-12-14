'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerVaccine(formData: FormData) {
  const supabase = await createClient()
  
  const vaccineId = formData.get('vaccineId') as string
  const fullName = formData.get('fullName') as string
  const birthDate = formData.get('birthDate') as string
  const nik = formData.get('nik') as string
  const time = formData.get('time') as string
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Check if vaccine exists and has stock
  const { data: vaccine, error: vaccineError } = await supabase
    .from('vaccines')
    .select('stock, name')
    .eq('id', vaccineId)
    .single()

  if (vaccineError || !vaccine) {
    return { error: 'Vaksin tidak ditemukan' }
  }

  if (vaccine.stock < 1) {
    return { error: 'Stok vaksin habis' }
  }

  // Create registration with new fields
  // Note: We are storing fullName, birthDate, nik in the registration itself if the schema supports it,
  // or we might want to update the profile? 
  // The user request implies these are inputs for the registration. 
  // Ideally, NIK and BirthDate should be in Profile, but for this specific form, let's store them in registration
  // as per the schema update I planned (adding columns to registrations).
  
  // Calculate next Monday
  const today = new Date()
  const nextMonday = new Date(today)
  nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
  if (nextMonday <= today) {
    nextMonday.setDate(nextMonday.getDate() + 7)
  }
  const scheduledDate = nextMonday.toISOString()

  // Generate Queue Number (Simple Random for now, ideally sequential per day)
  // Format: A-XXX
  const randomNum = Math.floor(Math.random() * 999) + 1
  const queueNumber = `A-${randomNum.toString().padStart(3, '0')}`

  const { error: regError } = await supabase
    .from('registrations')
    .insert({
      user_id: user.id,
      vaccine_id: vaccineId,
      status: 'pending', // Still pending until admin confirms? Or approved immediately? User said "status jadwal muncul". Let's keep pending but show it.
      nik: nik,
      patient_name: fullName,
      email: user.email,
      phone_number: formData.get('phoneNumber') as string,
      birth_date: birthDate,
      vaccination_time: time,
      scheduled_date: scheduledDate,
      queue_number: queueNumber
    })

  if (regError) {
    console.error(regError)
    return { error: regError.message }
  }

  // Decrement stock
  await supabase
    .from('vaccines')
    .update({ stock: vaccine.stock - 1 })
    .eq('id', vaccineId)

  revalidatePath('/dashboard')
  redirect('/schedule') // Redirect to schedule as requested
}
