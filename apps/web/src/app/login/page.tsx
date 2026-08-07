import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-stone-50 px-4 dark:bg-stone-950">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 animate-float-blob rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 animate-float-blob rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/10"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative w-full max-w-sm animate-scale-in rounded-2xl border border-stone-200/70 bg-white/90 p-8 shadow-xl shadow-stone-900/5 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-brand text-sm font-bold text-brand-foreground shadow-sm">
            SI
          </span>
          <div>
            <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Smart Inventory</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">Restaurant Inventory Management</p>
          </div>
        </div>
        <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">Sign in to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
}
