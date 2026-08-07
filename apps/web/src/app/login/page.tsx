import { Box } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-fade-in-up rounded-md border border-outline-variant bg-surface-container p-8">
        <div className="mb-6 flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" strokeWidth={2.5} aria-hidden="true" />
          <h1 className="font-headline text-xl font-bold text-on-surface">Smart Inventory</h1>
        </div>
        <p className="mb-6 text-sm text-on-surface-variant">Restaurant Inventory Management — sign in to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
}
