"use server";

import { TProfile } from "@/schema/profile-schema";
import { createClient } from "@/utils/supabase/server";

const collectionName = "profiles";

export async function getProfiles() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(collectionName).select("*");
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

export async function getProfilePatiens() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .eq("role", "patient");
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

export async function updateProfile({
  id,
  payload,
}: {
  id: string;
  payload: TProfile;
}) {
  const supabase = await createClient();

  try {
    const { error: dbError, data } = await supabase
      .from(collectionName)
      .update({
        full_name: payload.full_name,
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
