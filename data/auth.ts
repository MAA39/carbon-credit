import { createClient } from "@/lib/supabase/server";
import "server-only";
export const currentUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
