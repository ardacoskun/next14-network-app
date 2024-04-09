"use client";

import { useFormState } from "react-dom";
import { Rating } from "@mantine/core";

interface SkillRatingFormProps {
  rating: number;
  skillId: string;
}

const SkillRatingForm = ({ rating, skillId }: SkillRatingFormProps) => {
  const initialState = {};
  // const [state,dispatch]=useFormState()

  const handleChange = (newRating: number) => {
    console.log("🚀 ~ handleChange ~ newRating:", newRating);
    return {};
  };

  return <Rating value={rating} onChange={handleChange} />;
};

export default SkillRatingForm;
