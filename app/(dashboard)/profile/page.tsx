import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import UserForm from "@/components/user/UserForm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

const Page = async () => {
  const session = await getSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id),
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
};

export default Page;
