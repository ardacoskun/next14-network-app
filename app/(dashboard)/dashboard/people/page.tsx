import { db } from "@/lib/db";

const getUsers = async () => {
  const res = await db.query.users.findMany();
  return res;
};

const Page = async () => {
  const data = await getUsers();

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
