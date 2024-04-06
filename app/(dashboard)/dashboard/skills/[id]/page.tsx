import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";
import SortSkillSelect from "@/components/skill/SortSkillSelect";

const getSkill = async (id: string) => {
  return await db.query.skills.findFirst({ where: eq(skills.id, id) });
};

const getUsers = async (skillId: string, sort: string) => {
  const promise = db
    .select()
    .from(users)
    .leftJoin(usersToSkills, eq(users.id, usersToSkills.userId))
    .where(eq(usersToSkills.skillId, skillId));

  switch (sort) {
    case "name":
      promise.orderBy(users.name);
      break;
    case "-name":
      promise.orderBy(desc(users.name));
      break;
    case "rating":
      promise.orderBy(usersToSkills.rating);
      break;
    case "-rating":
      promise.orderBy(desc(usersToSkills.rating));
      break;
  }

  return await promise;
};

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    sort: string;
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = params;
  const { sort } = searchParams;

  const skill = await getSkill(id);
  const users = await getUsers(id, sort);

  if (!id) {
    return notFound();
  }

  return (
    <div>
      <h1>Users with {skill?.name} skill</h1>
      <SortSkillSelect value={sort} />
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
