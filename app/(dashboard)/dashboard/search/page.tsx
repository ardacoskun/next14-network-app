import { ilike, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

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
      {users.map((item) => (
        <div key={item.id}>
          {item.name} - {item.firstName} - {item.lastName} - {item.jobTitle}{" "}
        </div>
      ))}
    </div>
  );
};

export default Page;
