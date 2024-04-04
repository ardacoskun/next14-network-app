"use client";
import { Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

const SignInButton = ({ provider }: { provider: any }) => {
  const getIcon = () => {
    switch (provider.id) {
      case "github":
        return <IconBrandGithub />;
    }
  };

  return (
    <Button
      leftSection={getIcon()}
      onClick={() => signIn(provider.id)}
    >{`Sign in with ${provider.name}`}</Button>
  );
};

export default SignInButton;
