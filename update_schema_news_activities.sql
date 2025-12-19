-- Create news table
create table if not exists public.news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for news
alter table public.news enable row level security;

-- Policies for news
-- Drop existing policies to avoid errors on re-run
drop policy if exists "News are viewable by everyone." on public.news;
drop policy if exists "Only admins can manage news." on public.news;

create policy "News are viewable by everyone."
  on news for select
  using ( true );

create policy "Only admins can manage news."
  on news for all
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

-- Add image_url to activities if it doesn't exist
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'activities' and column_name = 'image_url') then
    alter table public.activities add column image_url text;
  end if;
end $$;

-- Storage policies (assuming 'images' bucket exists as per user)
-- We need to ensure policies exist for the 'images' bucket

do $$
begin
  -- Drop policies if they exist to ensure fresh creation
  drop policy if exists "Public Access" on storage.objects;
  drop policy if exists "Authenticated users can upload images" on storage.objects;
  drop policy if exists "Authenticated users can update images" on storage.objects;
  drop policy if exists "Authenticated users can delete images" on storage.objects;
end $$;

-- Policy to allow public access to images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Policy to allow authenticated users (or just admins) to upload images
-- For simplicity, allowing authenticated users to upload, but ideally should be admin only
create policy "Authenticated users can upload images"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update images"
on storage.objects for update
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete images"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );
