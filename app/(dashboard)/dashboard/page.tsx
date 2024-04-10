import { count, desc, eq } from "drizzle-orm";
import { BarChart } from "@mantine/charts";
import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";

const getCountOfJobTitles = async () => {
  return await db
    .select({ jobTitle: users.jobTitle, count: count() })
    .from(users)
    .groupBy(users.jobTitle)
    .orderBy(desc(count()));
};

const getCountOfSkills = async () => {
  return await db
    .select({ skills: skills.name, count: count() })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.name)
    .orderBy(desc(count()));
};

const Page = async () => {
  const data = await getCountOfJobTitles();
  const data2 = await getCountOfSkills();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">Dashboard</h1>
      <ChartComponent type="jobTitle" title="Job Titles" data={data} />
      <ChartComponent type="skills" title="Skills" data={data2} />
    </div>
  );
};

export default Page;

interface ChartComponentProps {
  type: string;
  title: string;
  data: any;
}

const ChartComponent = ({ type, title, data }: ChartComponentProps) => {
  return (
    <>
      <h2 className="font-bold text-lg">{title}</h2>
      <BarChart
        h={300}
        data={data}
        dataKey={type}
        type="stacked"
        orientation="vertical"
        yAxisProps={{ width: 80 }}
        series={[
          { name: "count", color: type === "skills" ? "orange.6" : "blue.6" },
        ]}
      />
    </>
  );
};
