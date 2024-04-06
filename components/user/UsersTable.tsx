"use client";
import Link from "next/link";
import { Paper, Table } from "@mantine/core";
import { User } from "@/lib/types";

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <Paper withBorder>
      <Table withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Job Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Link
                  href={`/dashboard/people/${item.id}`}
                  className="text-blue-500"
                >
                  {item.name}
                </Link>
              </Table.Td>
              <Table.Td>{item.firstName}</Table.Td>
              <Table.Td>{item.lastName}</Table.Td>
              <Table.Td>{item.jobTitle}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default UsersTable;
