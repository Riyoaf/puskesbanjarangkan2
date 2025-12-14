create table if not exists public.family_members (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  nik text not null,
  birth_date date not null,
  phone_number text not null,
  relationship text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.family_members enable row level security;

-- Policies
create policy "Users can view their own family members"
  on public.family_members for select
  using (auth.uid() = user_id);

create policy "Users can insert their own family members"
  on public.family_members for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own family members"
  on public.family_members for update
  using (auth.uid() = user_id);

create policy "Users can delete their own family members"
  on public.family_members for delete
  using (auth.uid() = user_id);
