"use server";

import { TVaccine } from "@/schema/vaccine-schema";
import { createClient } from "@/utils/supabase/server";

const collectionName = "vaccines";

export async function getVaccines() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(collectionName)
      .select("*")
      .order("name");

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

export async function createVaccine(payload: TVaccine) {
  const supabase = await createClient();

  try {
    const { error: dbError, data } = await supabase
      .from(collectionName)
      .insert({
        name: payload.name,
        description: payload.description,
        stock: payload.stock,
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

export async function updateVaccine({
  id,
  payload,
}: {
  id: string;
  payload: TVaccine;
}) {
  const supabase = await createClient();

  try {
    const { error: dbError, data } = await supabase
      .from(collectionName)
      .update({
        name: payload.name,
        description: payload.description,
        stock: payload.stock,
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

export async function deleteVaccine(id: string) {
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
