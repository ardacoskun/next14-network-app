import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";
import SortSkillSelect from "@/components/skill/SortSkillSelect";
import Link from "next/link";
import { Avatar } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

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
    <div className="flex flex-col gap-5 max-w-md">
      <h1 className="font-bold text-xl">Users with {skill?.name} skill</h1>
      <SortSkillSelect value={sort} />
      <ul className="flex flex-col gap-0.5">
        {users.map((item) => (
          <li key={item.user.id}>
            <Link
              href={`/dashboard/people/${item.user.id}`}
              className="p-2 border-blue-400 border-b flex flex-row justify-between items-center"
            >
              <div className="flex flex-row gap-2 items-center">
                <Avatar src={item.user.image} /> {item.user.name}
              </div>
              <div className="flex flex-row gap-2">
                {item.users_to_skills?.rating} <IconStar color="orange" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
