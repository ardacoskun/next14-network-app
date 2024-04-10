"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { getSession } from "./auth";
import { db } from "./db";
import { users, usersToSkills } from "./schema";
import { NewUserToSkill } from "./types";

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

const UpdateSkillRatingSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().max(5),
});

interface UpdateSkillRatingState {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
}

export const updateSkillRating = async (
  prevState: UpdateSkillRatingState,
  formData: FormData
): Promise<UpdateSkillRatingState> => {
  const session = await getSession();

  const validateFields = UpdateSkillRatingSchema.safeParse({
    skillId: formData.get("skillId"),
    rating: parseInt(formData.get("rating")?.toString()!),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Update skill error",
    };
  }

  await db
    .update(usersToSkills)
    .set({ rating: validateFields.data.rating })
    .where(
      and(
        eq(usersToSkills.skillId, validateFields.data.skillId),
        eq(usersToSkills.userId, session?.user.id)
      )
    );

  revalidatePath("/dashboard/profile/skills");

  return {
    success: "Update skill success",
  };
};

const AddUsersToSkillSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5),
});

export interface AddUsersToSkillState {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
}

export const addUsersToSkill = async (
  prevState: AddUsersToSkillState,
  formData: FormData
): Promise<AddUsersToSkillState> => {
  const session = await getSession();

  const validateFields = AddUsersToSkillSchema.safeParse({
    skillId: formData.get("skillId"),
    rating: parseInt(formData.get("rating")?.toString()!),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "An error occured",
    };
  }

  const userToSkill = await db.query.usersToSkills.findFirst({
    where: and(
      eq(usersToSkills.skillId, validateFields.data.skillId),
      eq(usersToSkills.userId, session?.user.id)
    ),
  });

  if (userToSkill) {
    return {
      message: "Rating for this skill already exists",
    };
  }

  const newUserToSkill: NewUserToSkill = {
    skillId: validateFields.data.skillId,
    userId: session?.user.id,
    rating: validateFields.data.rating,
  };

  await db.insert(usersToSkills).values(newUserToSkill);

  revalidatePath("/dashboard/profile/skills");

  return {
    success: "User to skill created",
  };
};
