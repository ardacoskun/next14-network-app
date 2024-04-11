import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import UserCard from "@/components/user/UserCard";

const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { usersToUsersSkills: { with: { skill: true } } },
  });
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <div>
        <UserCard user={user} />
      </div>
    </div>
  );
};

export default Page;
