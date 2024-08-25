"use server";
import { createClient } from "@/lib/supabase/server";

export const createItem = async (formData: {
  name: string;
  amount: number;
}) => {
  const supabase = createClient();
  const { error } = await supabase.from("items").insert([formData]);
  if (error) {
    throw error;
  }
};
