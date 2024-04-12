import { NextResponse } from "next/server";
import main from "@/scripts/migrate";

export async function GET() {
  main();
  return NextResponse.json({ message: "SUCCESS" });
}
