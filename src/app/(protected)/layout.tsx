import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/app/(auth)/actions";

const Layout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow bg-background p-8 text-text-primary">
        <header className="mb-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text-primary">My Dishes</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-primary">
                Logged in as {data.user.email}
              </span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="text-sm font-medium text-red-500 transition hover:text-red-700"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
