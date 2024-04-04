import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <h1>RestrictedPage</h1>
    </div>
  );
};

export default Page;
