import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import PaginationContainer from "@/components/PaginationContainer";
import UserCard from "@/components/UserCard";

const PER_PAGE = 20;

const getUsers = async (page: number) => {
  const countRes = await db.select({ value: count() }).from(users);
  const offset = PER_PAGE * (page - 1);

  const data = await db.query.users.findMany({
    limit: PER_PAGE,
    offset,
  });

  const userCount = countRes[0].value;
  const numPages = Math.ceil(userCount / PER_PAGE);
  return {
    data,
    count: userCount,
    numPages,
  };
};

interface PageProps {
  searchParams: {
    page: number;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { page } = searchParams;
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await getUsers(page || 1);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">People</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {res?.data?.map((item) => (
          <div key={item.id}>
            <UserCard user={item} />
          </div>
        ))}
      </div>

      <PaginationContainer total={res?.numPages} value={page} />
    </div>
  );
};

export default Page;
