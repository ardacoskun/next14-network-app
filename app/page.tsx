import { Roboto_Mono } from "next/font/google";
import { Button } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-5">
      <IconBriefcase />
      <div className={`${roboto.className} font-bold`}>
        Professional Network
      </div>
      {/* <LoginButton /> */}
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
