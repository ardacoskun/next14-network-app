"use client";

import { useFormState } from "react-dom";
import { Rating } from "@mantine/core";
import { updateSkillRating } from "@/lib/actions";

interface SkillRatingFormProps {
  rating: number;
  skillId: string;
}

const SkillRatingForm = ({ rating, skillId }: SkillRatingFormProps) => {
  const initialState = {};
  const [state, dispatch] = useFormState(updateSkillRating, initialState);

  const handleChange = (newRating: number) => {
    const formData = new FormData();
    formData.set("rating", newRating.toString());
    formData.set("skillId", skillId);

    dispatch(formData);
  };

  return <Rating value={rating} onChange={handleChange} />;
};

export default SkillRatingForm;
