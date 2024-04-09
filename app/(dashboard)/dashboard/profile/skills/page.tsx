import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, usersToSkills } from "@/lib/schema";
import { eq } from "drizzle-orm";

const getUsersToSkills = async (userId: string) => {
  return await db.query.usersToSkills.findMany({
    with: { skill: true },
    where: eq(usersToSkills.userId, userId),
  });
};

const Page = async () => {
  const session = await getSession();
  const usersToSkills = await getUsersToSkills(session?.user.id);

  return (
    <div>
      <h1>Manage Skills</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersToSkills.map((item) => (
            <tr key={item.skill.id}>
              <td>{item.skill.name}</td>
              <td>{item.rating}</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
