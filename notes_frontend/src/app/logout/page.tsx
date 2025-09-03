"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    const t = setTimeout(() => router.push("/login"), 300);
    return () => clearTimeout(t);
  }, [logout, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-slate-700">Signing out...</div>
    </main>
  );
}
