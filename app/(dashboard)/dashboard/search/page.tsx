import { ilike, or, sql } from "drizzle-orm";
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

const fuzzySearch = async (query: string) => {
  const res = await db
    .select()
    .from(users)
    .where(
      or(
        sql`similarity(first_name, ${query}) > 0.2`,
        sql`similarity(last_name, ${query}) > 0.2`,
        sql`similarity(job_title, ${query}) > 0.2`,
        sql`similarity(name, ${query}) > 0.2`
      )
    );
  return res;
};

const Page = async ({ searchParams }: PageProps) => {
  const { query } = searchParams;
  //   const users = await getUsers(query);
  const users = await fuzzySearch(query);

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
};

export default Page;
