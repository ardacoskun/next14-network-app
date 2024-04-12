import { expect, test } from "vitest";
import util from "util";
import { getKNearestNeighborsByUserId } from "@/lib/knn";

test("k nearest neighbors", async () => {
  const users = await getKNearestNeighborsByUserId(
    "04f0340b-b085-42fa-be46-b7f987418c1b",
    5
  );
  console.log(util.inspect(users, { colors: true, depth: null }));
  expect(users.length).toBe(5);
});
