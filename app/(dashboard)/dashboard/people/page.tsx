import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import PaginationContainer from "@/components/PaginationContainer";

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
  const res = await getUsers(page || 1);

  return (
    <div>
      {res?.data?.map((item) => (
        <div key={item.id}>
          {item.name} - {item.jobTitle}
        </div>
      ))}
      <PaginationContainer total={res?.numPages} value={page} />
    </div>
  );
};

export default Page;
