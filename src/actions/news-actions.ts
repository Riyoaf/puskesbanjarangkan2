"use server";

import { TNews } from "@/schema/news-schema";
import { createClient } from "@/utils/supabase/server";

const collectionName = "news";

export async function getNews() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      return {
        error: error,
        data: null,
      };
    }
    return {
      error: null,
      data,
    };
  } catch (error) {
    console.log("ERROR : ", error);
    return {
      error,
      data: null,
    };
  }
}
export async function getNewsById(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      return {
        error: error,
        data: null,
      };
    }
    return {
      error: null,
      data,
    };
  } catch (error) {
    console.log("ERROR : ", error);
    return {
      error,
      data: null,
    };
  }
}

export async function createNews(payload: TNews) {
  const supabase = await createClient();

  try {
    let image_url = null;

    if (
      payload.image &&
      payload.image instanceof File &&
      payload.image.size > 0
    ) {
      const fileExt = payload.image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from("images")
        .upload(fileName, payload.image);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return {
          error: uploadError,
          data: null,
        };
      } else {
        console.log("Upload Success:", data);
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(fileName);
        image_url = publicUrl;
        console.log("Public URL:", publicUrl);
      }
    } else {
      console.log("No image provided or invalid file");
    }

    const { error: dbError, data } = await supabase
      .from(collectionName)
      .insert({
        title: payload.title,
        content: payload.content,
        image_url,
        created_at: new Date(),
      });

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return {
        error: dbError,
        data: null,
      };
    }

    return {
      error: null,
      data,
    };
  } catch (error) {
    console.log("ERROR : ", error);
    return {
      error,
      data: null,
    };
  }
}

export async function updateNews({
  id,
  payload,
}: {
  id: string;
  payload: TNews;
}) {
  const supabase = await createClient();

  try {
    let image_url = payload.image_url ?? null;

    if (
      payload.image &&
      payload.image instanceof File &&
      payload.image.size > 0
    ) {
      const fileExt = payload.image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from("images")
        .upload(fileName, payload.image);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return {
          error: uploadError,
          data: null,
        };
      } else {
        console.log("Upload Success:", data);
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(fileName);
        image_url = publicUrl;
        console.log("Public URL:", publicUrl);
      }
    } else {
      console.log("No image provided or invalid file");
    }

    const { error: dbError, data } = await supabase
      .from(collectionName)
      .update({
        title: payload.title,
        content: payload.content,
        image_url,
      })
      .eq("id", id);

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return {
        error: dbError,
        data: null,
      };
    }

    return {
      error: null,
      data,
    };
  } catch (error) {
    console.log("ERROR : ", error);
    return {
      error,
      data: null,
    };
  }
}

export async function deleteNews(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .delete()
      .eq("id", id);
    if (error) {
      return {
        error,
        data: null,
      };
    }
    return {
      error: null,
      data,
    };
  } catch (error) {
    console.log("ERROR : ", error);
    return {
      error,
      data: null,
    };
  }
}
