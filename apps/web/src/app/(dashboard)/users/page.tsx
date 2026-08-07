import { redirect } from "next/navigation";
import type { User } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { UsersTable } from "@/components/users/UsersTable";
import { NewUserForm } from "@/components/users/NewUserForm";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();
  const canManageUsers = currentUser?.roles.some((role) => roleHasCapability(role, "MANAGE_USERS"));
  if (!canManageUsers) redirect("/items");

  const client = await getAuthedGatewayClient();
  const users = await client.get<User[]>("/identity/users");

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Users</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">Role-based access control — PRD §3.16</p>
      </div>
      <NewUserForm />
      <UsersTable users={users} />
    </div>
  );
}
