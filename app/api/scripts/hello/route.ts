export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import hello from "@/scripts/hello";

export function GET() {
  hello();
  return NextResponse.json({ message: "SUCCESS" });
}
