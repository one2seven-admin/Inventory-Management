"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/actions/login";

const initialState: LoginActionState = {};

const inputClass =
  "w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-zinc-900 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
