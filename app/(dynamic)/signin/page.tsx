import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getSession } from "@/lib/auth";
import SignInButton from "@/components/SignInButton";

const SignInPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  const providers: any = await getProviders();

  return (
    <>
      {Object.values(providers).map((item: any) => (
        <div
          key={item.name}
          className="flex w-screen h-screen justify-center items-center"
        >
          <SignInButton provider={item} />
        </div>
      ))}
    </>
  );
};

export default SignInPage;
