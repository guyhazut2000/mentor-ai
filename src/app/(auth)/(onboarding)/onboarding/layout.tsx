import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.onboardingComplete === true) {
    redirect("/");
  }

  return <div className="flex flex-col h-screen">{children}</div>;
}
