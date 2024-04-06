import { db } from "@/lib/db";

const getUsers = async (page: number) => {
  const res = await db.query.users.findMany();
  return res;
};

interface PageProps {
  searchParams: {
    page: number;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { page } = searchParams;
  const data = await getUsers(page || 1);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {item.name} - {item.jobTitle}
        </div>
      ))}
    </div>
  );
};

export default Page;
