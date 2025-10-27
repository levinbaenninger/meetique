import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AuthView } from "@/modules/auth/ui/views/auth-view";

export const metadata: Metadata = {
  title: "Sign In",
};

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <AuthView />;
};

export default Page;
