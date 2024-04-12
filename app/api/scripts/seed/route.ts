export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import seedUsers from "@/scripts/seedUsers";
import seedJobTitle from "@/scripts/seedJobTitle";
import seedSkills from "@/scripts/seedSkills";
import seedUsersToSkills from "@/scripts/seedUsersToSkills";

export async function GET() {
  await seedUsers();
  await seedJobTitle();
  await seedSkills();
  await seedUsersToSkills();

  return NextResponse.json({ message: "SUCCESS" });
}
