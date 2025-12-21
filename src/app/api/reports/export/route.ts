import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Check auth - only admin should access this
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Fetch all completed registrations with vaccine details
  const { data: registrations, error } = await supabase
    .from('registrations')
    .select(`
      id,
      patient_name,
      nik,
      birth_date,
      phone_number,
      vaccination_time,
      scheduled_date,
      status,
      vaccines (
        name
      )
    `)
    .eq('status', 'completed')
    .order('scheduled_date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Flatten the data for easier consumption
  const flattenedData = registrations.map((reg: any) => ({
    patient_name: reg.patient_name,
    nik: reg.nik,
    birth_date: reg.birth_date,
    vaccine_name: reg.vaccines?.name || 'Unknown',
    scheduled_date: reg.scheduled_date,
    vaccination_time: reg.vaccination_time,
    status: reg.status
  }))

  return NextResponse.json(flattenedData)
}
