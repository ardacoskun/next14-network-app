"use server";

import { z } from "zod";
import { getSession } from "./auth";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";

const UpdateUserSchema = z.object({
  jobTitle: z.string().min(3),
  bio: z.string(),
});

export interface UpdateUserState {
  errors?: {
    jobTitle?: string[];
    bio?: string[];
  };
  message?: string;
  success?: string;
}

export const updateUser = async (
  prevState: UpdateUserState,
  formData: FormData
) => {
  const session = await getSession();
  const jobTitle = formData.get("jobTitle");
  const bio = formData.get("bio");

  const validateFields = UpdateUserSchema.safeParse({
    jobTitle,
    bio,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Update user error",
    };
  }

  await db
    .update(users)
    .set({
      jobTitle: validateFields.data.jobTitle,
      bio: validateFields.data.bio,
    })
    .where(eq(users.id, session?.user.id));

  return {
    success: "Update user success",
  };
};
