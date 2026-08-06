"use client";

import { useActionState } from "react";
import { ROLES } from "@platform/contracts";
import { createUserAction, type CreateUserActionState } from "@/actions/users/createUser";

const initialState: CreateUserActionState = {};

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function NewUserForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">New user</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input name="name" placeholder="Full name" required className={inputClass} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <input name="password" type="password" placeholder="Temporary password" required minLength={8} className={inputClass} />
        <select name="role" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Role
          </option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Creating…" : "Create user"}
      </button>
    </form>
  );
}
