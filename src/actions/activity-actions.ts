"use server";

import { TActivity } from "@/schema/activity-schema";
import { createClient } from "@/utils/supabase/server";

const collectionName = "activities";

export async function getActivities() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .order("date", { ascending: true });
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
export async function getActivityById(id: string) {
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

export async function createActivity(payload: TActivity) {
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
        date: payload.date,
        location: payload.location,
        description: payload.description,
        image_url,
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

export async function updateActivity({
  id,
  payload,
}: {
  id: string;
  payload: TActivity;
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
        date: payload.date,
        location: payload.location,
        description: payload.description,
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

export async function deleteActivity(id: string) {
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
