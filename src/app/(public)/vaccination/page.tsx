import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'
import RegistrationForm from './RegistrationForm'

export default async function RegisterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch available vaccines
  const { data: vaccines } = await supabase
    .from('vaccines')
    .select('*')
    .gt('stock', 0)
    .order('name')

  // Fetch last registration for pre-fill
  let lastReg = null
  if (user) {
    const { data } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    lastReg = data
  }

  return (
    <div className={styles.container}>
      <RegistrationForm 
        vaccines={vaccines || []} 
        lastReg={lastReg} 
        userEmail={user?.email}
      />
    </div>
  )
}
