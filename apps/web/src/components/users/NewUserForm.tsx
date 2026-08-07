"use client";

import { useActionState } from "react";
import { ROLES } from "@platform/contracts";
import { createUserAction, type CreateUserActionState } from "@/actions/users/createUser";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: CreateUserActionState = {};

export function NewUserForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 label-caps text-on-surface">New user</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Input name="name" placeholder="Full name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Temporary password" required minLength={8} />
        <Select name="role" required defaultValue="">
          <option value="" disabled>
            Role
          </option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </div>
      {state.error ? <p className="mt-2 text-sm text-danger">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Creating…" : "Create user"}
      </Button>
    </Card>
  );
}
