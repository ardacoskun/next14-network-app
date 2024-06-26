import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { usersToSkills } from "@/lib/schema";
import SkillRatingForm from "@/components/skill/SkillRatingForm";
import AddUserToSkillButton from "@/components/skill/AddUserToSkillButton";
import DeleteUserToSkillButton from "@/components/skill/DeleteUserToSkillButton";

const getUsersToSkills = async (userId: string) => {
  return await db.query.usersToSkills.findMany({
    with: { skill: true },
    where: eq(usersToSkills.userId, userId),
  });
};

const getAllSkills = async () => {
  return await db.query.skills.findMany();
};

const Page = async () => {
  const session = await getSession();
  const usersToSkills = await getUsersToSkills(session?.user.id);
  const skills = await getAllSkills();

  const tableHead = [
    { id: 1, name: "Name" },
    { id: 2, name: "Rating" },
    { id: 3, name: "Delete" },
  ];

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <h1 className="font-bold text-xl">Manage Skills</h1>
      <table className="border-collapse border-0">
        <thead>
          <tr>
            {tableHead.map((item) => (
              <th
                key={item.id}
                className="border-slate-600 p-2 border-b text-left"
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usersToSkills.map((item) => (
            <tr key={item.skill.id}>
              <td className="border-slate-600 p-2 border-t">
                {item.skill.name}
              </td>
              <td className="border-slate-600 p-2 border-t">
                <SkillRatingForm
                  rating={item.rating || 0}
                  skillId={item.skillId}
                />
              </td>
              <td className="border-slate-600 p-2 border-t">
                <DeleteUserToSkillButton skillId={item.skillId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddUserToSkillButton skills={skills} />
      </div>
    </div>
  );
};

export default Page;
