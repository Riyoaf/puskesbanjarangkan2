-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role text default 'patient' check (role in ('admin', 'patient')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create vaccines table
create table public.vaccines (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  stock integer default 0,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.vaccines enable row level security;

-- Policies for vaccines
create policy "Vaccines are viewable by everyone."
  on vaccines for select
  using ( true );

create policy "Only admins can insert/update vaccines."
  on vaccines for all
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

-- Create activities table
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date timestamp with time zone,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.activities enable row level security;

-- Policies for activities
create policy "Activities are viewable by everyone."
  on activities for select
  using ( true );

create policy "Only admins can manage activities."
  on activities for all
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

-- Create registrations table
create table public.registrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  vaccine_id uuid references public.vaccines(id) not null,
  status text default 'pending' check (status in ('pending', 'approved', 'completed', 'rejected')),
  scheduled_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.registrations enable row level security;

-- Policies for registrations
create policy "Users can view their own registrations."
  on registrations for select
  using ( auth.uid() = user_id );

create policy "Admins can view all registrations."
  on registrations for select
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

create policy "Users can create registrations."
  on registrations for insert
  with check ( auth.uid() = user_id );

create policy "Admins can update registrations."
  on registrations for update
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
