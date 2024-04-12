import { faker } from "@faker-js/faker";
import { NewUser } from "../lib/types";
import { users } from "../lib/schema";
import { db, pool } from "../lib/db";

export default async function main() {
  for (let i = 0; i < 100; i++) {
    const username = faker.internet.userName();
    const email = `${username}@example.com`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const image = faker.image.avatarGitHub();
    const newUser: NewUser = {
      id: crypto.randomUUID(),
      name: username,
      email,
      image,
      firstName,
      lastName,
    };
    await db.insert(users).values(newUser);
  }
  pool.end();
}

if (require.main === module) {
  main();
}
