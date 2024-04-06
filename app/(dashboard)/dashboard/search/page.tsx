import { ilike, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import UsersTable from "@/components/user/UsersTable";

interface PageProps {
  searchParams: {
    query: string;
  };
}

const getUsers = async (query: string) => {
  const q = "%" + query + "%";
  const res = await db.query.users.findMany({
    where: or(
      ilike(users.name, q),
      ilike(users.jobTitle, q),
      ilike(users.firstName, q),
      ilike(users.lastName, q)
    ),
  });
  return res;
};

const Page = async ({ searchParams }: PageProps) => {
  const { query } = searchParams;
  const users = await getUsers(query);

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
};

export default Page;
