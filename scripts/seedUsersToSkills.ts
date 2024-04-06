import { db, pool } from "@/lib/db";
import { usersToSkills } from "@/lib/schema";
import { NewUserToSkill } from "@/lib/types";

async function main() {
  const users = await db.query.users.findMany();
  const skills = await db.query.skills.findMany();

  for (let user of users) {
    for (let skill of skills) {
      if (Math.random() < 0.5) {
        continue;
      }
      const rating = Math.floor(Math.random() * 5) + 1;
      const newUserToSkill: NewUserToSkill = {
        userId: user.id,
        skillId: skill.id,
        rating,
      };
      await db
        .insert(usersToSkills)
        .values(newUserToSkill)
        .onConflictDoNothing();
    }
  }
  pool.end();
}

main();