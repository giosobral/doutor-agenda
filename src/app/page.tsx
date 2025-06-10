import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  if (session.user.plan === "null") {
    redirect("/new-subscription");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Hello World</h1>
      <Button>+ Agendamento</Button>
    </div>
  );
}
