import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            console.error("Error setting cookies", cookiesToSet);
          }
        },
      },
    },
  );
  return client;
}

export async function getUser() {
  const { auth } = await createClient();
  const userObj = await auth.getUser();

  if (userObj.error) {
    console.error("Error getting user", userObj.error);
    return null;
  }
  return userObj.data.user;
}
