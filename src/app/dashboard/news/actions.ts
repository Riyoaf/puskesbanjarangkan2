'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addNews(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const image = formData.get('image') as File

  let image_url = null

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop()
    const fileName = `news-${Date.now()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
      image_url = publicUrl
    }
  }

  await supabase.from('news').insert({
    title,
    content,
    image_url
  })

  revalidatePath('/dashboard/news')
  revalidatePath('/')
}

export async function deleteNews(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('news').delete().eq('id', id)

  revalidatePath('/dashboard/news')
  revalidatePath('/')
}

export async function updateNews(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const image = formData.get('image') as File

  const updates: any = {
    title,
    content,
  }

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop()
    const fileName = `news-${Date.now()}.${fileExt}`
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

  await supabase
    .from('news')
    .update(updates)
    .eq('id', id)

  revalidatePath('/dashboard/news')
  revalidatePath('/')
}
