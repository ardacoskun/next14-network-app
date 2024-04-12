import { expect, test } from "vitest";
import { cosineSimilarity } from "@/lib/similarity";

test("cosine similarity exact vectors", () => {
  const vector1 = [5, 5, 5, 5, 5];
  const vector2 = [5, 5, 5, 5, 5];

  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.99);
});
