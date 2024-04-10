"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const AddUserToSkillButton = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered></Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add New Skill
      </Button>
    </>
  );
};

export default AddUserToSkillButton;
