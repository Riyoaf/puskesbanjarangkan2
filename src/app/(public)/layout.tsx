import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let role = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    role = profile?.role;
    
    // If Admin tries to access public pages (except maybe login?), redirect to dashboard?
    // User said: "untuk halaman adminnya dia hanya berupa dashboard... tidak ada lagi halaman home"
    // So if Admin is logged in, they should be in dashboard.
    if (role === 'admin') {
        redirect('/dashboard');
    }
  }

  return (
    <>
      <Navbar user={user} role={role} />
      {children}
    </>
  );
}
