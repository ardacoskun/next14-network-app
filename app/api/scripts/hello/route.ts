import hello from "@/scripts/hello";
import { NextResponse } from "next/server";

export function GET() {
  hello();
  return NextResponse.json({ message: "SUCCESS" });
}
