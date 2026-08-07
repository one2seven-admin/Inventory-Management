import type { User } from "@platform/contracts";
import { Badge } from "@/components/ui/Badge";
import { Table, Thead, Th, Tr, Td } from "@/components/ui/Table";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <Thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Roles</Th>
          <Th>Status</Th>
        </tr>
      </Thead>
      <tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td className="font-medium">{user.name}</Td>
            <Td className="text-on-surface-variant">{user.email}</Td>
            <Td>{user.roles.join(", ")}</Td>
            <Td>
              <Badge tone={user.isActive ? "success" : "neutral"}>{user.isActive ? "Active" : "Inactive"}</Badge>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
