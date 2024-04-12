import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import UserCard from "@/components/user/UserCard";
import { getKNearestNeighborsByUserId } from "@/lib/knn";

const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { usersToUsersSkills: { with: { skill: true } } },
  });
};

const getSimilarPeople = async (userId: string) => {
  const similarPeople = await getKNearestNeighborsByUserId(userId, 5);
  return similarPeople;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUserById(id);
  const similarPeople = await getSimilarPeople(id);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-row gap-5">
      <div>
        <UserCard user={user} />
      </div>
      <div>
        <h2 className="font-bold text-xl">Bio</h2>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: user.bio ?? "" }}
        />
        <div>
          {similarPeople?.map((item) => (
            <div key={item.user.id}>
              {item.user.firstName} {item.user.lastName} {item.user.jobTitle}{" "}
              {item.similarity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
