'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addActivity(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as File

  let image_url = null

  if (image && image.size > 0) {
    console.log('Uploading image:', image.name, image.size)
    const fileExt = image.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error: uploadError, data } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (uploadError) {
      console.error('Upload Error:', uploadError)
    } else {
      console.log('Upload Success:', data)
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
      image_url = publicUrl
      console.log('Public URL:', publicUrl)
    }
  } else {
    console.log('No image provided or empty file')
  }

  const { error: dbError } = await supabase.from('activities').insert({
    title,
    date,
    location,
    description,
    image_url
  })

  if (dbError) console.error('DB Insert Error:', dbError)

  revalidatePath('/dashboard/activities')
  revalidatePath('/') // Update landing page too
}

export async function deleteActivity(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('activities').delete().eq('id', id)

  revalidatePath('/dashboard/activities')
  revalidatePath('/')
}

export async function updateActivity(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as File

  const updates: any = {
    title,
    date,
    location,
    description,
  }

  if (image && image.size > 0) {
    console.log('Updating image:', image.name, image.size)
    const fileExt = image.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
      updates.image_url = publicUrl
    }
  }

  const { error: dbError } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)

  if (dbError) console.error('DB Update Error:', dbError)

  revalidatePath('/dashboard/activities')
  revalidatePath('/')
}
