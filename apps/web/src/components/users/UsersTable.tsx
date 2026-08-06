import type { User } from "@platform/contracts";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Roles</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{user.name}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">{user.roles.join(", ")}</td>
              <td className="px-3 py-2">{user.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
