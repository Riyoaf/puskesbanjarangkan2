"use server";

import { createClient } from "@/utils/supabase/server";

const collectionName = "registrations";

export async function getRegistrations() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*, vaccines(name)")
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
