"use client";

import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { deleteUserToSkill } from "@/lib/actions";

const DeleteUserToSkillButton = ({ skillId }: { skillId: string }) => {
  const handleClick = async () => {
    await deleteUserToSkill(skillId);
  };

  return (
    <Button variant="subtle" color="red" onClick={handleClick}>
      <IconTrash />
    </Button>
  );
};

export default DeleteUserToSkillButton;
