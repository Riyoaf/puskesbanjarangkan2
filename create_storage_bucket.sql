-- Create the 'images' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- Ensure RLS is enabled (it usually is by default for storage.objects)
-- alter table storage.objects enable row level security;

-- Re-apply policies to be safe (drop existing ones first to avoid errors if they exist with different names or just use IF NOT EXISTS logic if possible, but standard SQL doesn't support CREATE POLICY IF NOT EXISTS easily without DO block)

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

-- Policy to allow authenticated users to upload images
create policy "Authenticated users can upload images"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update images"
on storage.objects for update
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete images"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );
