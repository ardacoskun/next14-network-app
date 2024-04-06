import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";

const getSkill = async (id: string) => {
  return await db.query.skills.findFirst({ where: eq(skills.id, id) });
};

const getUsers = async (skillId: string) => {
  return await db
    .select()
    .from(users)
    .leftJoin(usersToSkills, eq(users.id, usersToSkills.userId))
    .where(eq(usersToSkills.skillId, skillId));
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const skill = await getSkill(id);
  const users = await getUsers(id);

  if (!id) {
    return notFound();
  }

  return (
    <div>
      <h1>Users with {skill?.name} skill</h1>
      <ul>
        {users.map((item) => (
          <li key={item.user.id}>
            {item.user.name} {item.users_to_skills?.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
