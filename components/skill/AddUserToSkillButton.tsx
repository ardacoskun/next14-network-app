"use client";

import { Button, Modal, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Skill } from "@/lib/types";

const AddUserToSkillButton = ({ skills }: { skills: Skill[] }) => {
  const [opened, { open, close }] = useDisclosure();

  const data = skills.map((item) => {
    return { value: item.id, label: item.name };
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered>
        <form action="">
          <Stack gap={20}>
            <Select data={data} searchable name="skillId" />
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add New Skill
      </Button>
    </>
  );
};

export default AddUserToSkillButton;
