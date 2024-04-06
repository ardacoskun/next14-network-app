import { db } from "@/lib/db";
import { skills, usersToSkills } from "@/lib/schema";
import { Card } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";

const getSkills = async () => {
  const res = await db
    .select({
      id: skills.id,
      name: skills.name,
      count: sql<number>`count(${usersToSkills.userId})`,
    })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.id, skills.name);

  return res;
};

const Page = async () => {
  const skills = await getSkills();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">Skills</h1>
      <ul className="flex flex-col gap-5">
        {skills.map((item) => (
          <li key={item.id}>
            <Link href={`/dashboard/skills/${item.id}`}>
              <Card withBorder shadow="sm">
                <div className="flex flex-row justify-between">
                  {item?.name}
                  <span className="flex flex-row gap-2">
                    <IconUsersGroup /> {item?.count}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
