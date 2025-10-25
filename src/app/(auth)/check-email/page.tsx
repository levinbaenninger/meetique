import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { CheckEmailView } from "@/modules/auth/ui/views/check-email-view";

export const metadata: Metadata = {
  title: "Check Email",
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  const params = await searchParams;
  const email = params.email as string;
  const name = params.name as string | undefined;

  if (!email || typeof email !== "string") {
    redirect("/sign-in");
  }

  return <CheckEmailView email={email} name={name} />;
};

export default Page;
