'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function cancelSchedule(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { data: reg } = await supabase
    .from('registrations')
    .select('status')
    .eq('id', id)
    .single()

  console.log('Attempting to cancel schedule:', id)

  if (reg?.status !== 'pending' && reg?.status !== 'approved') {
    console.log('Invalid status for cancellation:', reg?.status)
    return { error: 'Hanya jadwal dengan status "Menunggu" atau "Disetujui" yang dapat dibatalkan.' }
  }

  const { error } = await supabase
    .from('registrations')
    .update({ status: 'cancelled' })
    .eq('id', id)

  if (error) {
    console.error('Error cancelling schedule:', error)
    return { error: error.message }
  }
  
  console.log('Schedule cancelled successfully:', id)

  revalidatePath('/schedule')
  revalidatePath('/dashboard/registrations')
}
