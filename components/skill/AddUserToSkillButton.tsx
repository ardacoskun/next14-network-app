"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button, Modal, Rating, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Skill } from "@/lib/types";
import { AddUsersToSkillState, addUsersToSkill } from "@/lib/actions";

const AddUserToSkillButton = ({ skills }: { skills: Skill[] }) => {
  const [opened, { open, close }] = useDisclosure();
  const [value, setValue] = useState(0);

  const initialState: AddUsersToSkillState = {};

  const [state, dispatch] = useFormState(addUsersToSkill, initialState);

  const data = skills.map((item) => {
    return { value: item.id, label: item.name };
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered>
        <form action={dispatch}>
          <Stack gap={20}>
            <Select
              data={data}
              searchable
              name="skillId"
              error={state?.errors?.skillId}
            />
            <Rating value={value} onChange={setValue} name="rating" />
            {state?.errors?.rating && (
              <p className="text-red-600 font-semibold">
                {state.errors.rating}
              </p>
            )}
            <div>
              <Button type="submit">Save</Button>
            </div>
            {state?.message && (
              <p className="text-red-600 font-semibold">{state.message}</p>
            )}
            {state?.success && (
              <p className="text-green-600 font-semibold">{state.success}</p>
            )}
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
