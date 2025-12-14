-- Create a trigger to automatically create a profile entry when a new user signs up via Supabase Auth.

-- 1. Create the function that will be called by the trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    'patient' -- Default role
  );
  return new;
end;
$$;

-- 2. Create the trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
