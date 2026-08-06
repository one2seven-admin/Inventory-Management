import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-stone-50 px-4 dark:bg-black">
      <div className="w-full max-w-sm animate-fade-in-up rounded-lg border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-950">
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-50">Smart Inventory</h1>
        <p className="mt-1 mb-6 text-sm text-stone-500">Restaurant Inventory Management — sign in to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
}
