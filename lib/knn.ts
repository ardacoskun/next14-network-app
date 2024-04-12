import { eq, not } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";
import { combinedSimilarity } from "./similarity";

export const getKNearestNeighborsByUserId = async (
  userId: string,
  k: number
) => {
  //Get user by user id
  const targetUser = await db.query.users.findFirst({
    with: { usersToUsersSkills: { with: { skill: true } } },
    where: eq(users.id, userId),
  });

  if (!targetUser) {
    throw new Error("User not found!");
  }

  //Get all other users
  const otherUsers = await db.query.users.findMany({
    with: { usersToUsersSkills: { with: { skill: true } } },
    where: not(eq(users.id, userId)),
  });

  //Get all skills
  const allSkills = await db.query.skills.findMany();

  //Create skill id -> index map
  const skillIdToIndexMap = new Map();
  allSkills.forEach((value, index) => skillIdToIndexMap.set(value.id, index));

  //Create skill vector for target user
  const vector1 = new Array(allSkills.length).fill(0);
  targetUser.usersToUsersSkills.forEach((uts) => {
    const index = skillIdToIndexMap.get(uts.skillId);
    vector1[index] = uts.rating;
  });
  //Calculate the combined similarity of user to each other user
  const usersWithSimilarityScores = otherUsers.map((user) => {
    const vector2 = new Array(allSkills.length).fill(0);
    user.usersToUsersSkills.forEach((uts) => {
      const index = skillIdToIndexMap.get(uts.skillId);
      vector2[index] = uts.rating;
    });
    const combinedSimilarityScores = combinedSimilarity(
      vector1,
      vector2,
      targetUser.jobTitle,
      user.jobTitle
    );
    return {
      user,
      similarity: combinedSimilarityScores,
    };
  });
  //Sort the combined similarity in desc order
  usersWithSimilarityScores.sort((a, b) => b.similarity - a.similarity);
  //Get the top k users
  const topKUsersWithSimilarityScore = usersWithSimilarityScores.slice(0, k);

  return topKUsersWithSimilarityScore;
};
