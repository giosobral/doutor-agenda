"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, userToClinicTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createClinic = async (name: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();

  await db.insert(userToClinicTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  redirect("/dashboard");
};
