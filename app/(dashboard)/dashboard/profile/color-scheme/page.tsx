"use client";

import {
  Button,
  Group,
  MantineColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { colorSchemeButtons } from "@/data";

const Page = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      {colorSchemeButtons.map((item) => (
        <Button
          key={item.id}
          onClick={() =>
            item.name === "clear"
              ? clearColorScheme()
              : setColorScheme(item.name as MantineColorScheme)
          }
        >
          {item.title}
        </Button>
      ))}
    </Group>
  );
};

export default Page;
