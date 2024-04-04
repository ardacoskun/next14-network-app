import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getSession } from "@/lib/auth";
import SignInButton from "@/components/SignInButton";

const SignInPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  const providers: any = await getProviders();

  return (
    <>
      {Object.values(providers).map((item: any) => (
        <div key={item.name}>
          <SignInButton provider={item} />
        </div>
      ))}
    </>
  );
};

export default SignInPage;
