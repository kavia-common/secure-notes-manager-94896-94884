"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { APP_COLORS } from "@/lib/config";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message || "Login failed")
          : "Login failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-lg p-6" style={{ borderColor: "#e5e7eb", background: "#ffffff" }}>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "#0f172a" }}>Sign in</h1>
        <p className="text-sm mb-4" style={{ color: "#475569" }}>
          Welcome back. Please enter your details.
        </p>

        {error && (
          <div className="mb-3 px-3 py-2 rounded-md text-sm" style={{ background: "#fee2e2", color: "#991b1b" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm mb-1" style={{ color: "#334155" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1" style={{ color: "#334155" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            className="btn btn-primary w-full"
            style={{ background: APP_COLORS.primary }}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm mt-4" style={{ color: "#475569" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline" style={{ color: APP_COLORS.primary }}>
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
