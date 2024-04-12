import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import UserCard from "@/components/user/UserCard";
import { getKNearestNeighborsByUserId } from "@/lib/knn";
import { Avatar, NumberFormatter } from "@mantine/core";

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
        {user?.bio && (
          <>
            <h2 className="font-bold text-xl">Bio</h2>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: user.bio }}
            />
          </>
        )}

        <h2 className="font-bold text-xl">Similar People</h2>
        <div className="flex flex-col gap-5 mt-5">
          {similarPeople?.map((item) => (
            <div
              key={item.user.id}
              className="flex flex-row items-center gap-5"
            >
              <Avatar src={item.user.image} size="md" />
              <div>
                {item.user.firstName} {item.user.lastName} {item.user.jobTitle}{" "}
              </div>
              <div className="flex-grow text-right">
                <NumberFormatter
                  value={item.similarity * 100}
                  suffix="%"
                  decimalScale={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
