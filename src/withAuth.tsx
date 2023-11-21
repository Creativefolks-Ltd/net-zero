import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function withAuth(Component: React.ComponentType) {
  return async function WithAuth() {
    const supabase = createServerComponentClient<Database>({
      cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/");
    }

    return <Component />;
  };
}
