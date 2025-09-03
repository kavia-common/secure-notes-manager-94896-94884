"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { APP_COLORS } from "@/lib/config";

export default function RegisterPage() {
  const { register } = useAuth();
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
      await register(email, password);
      router.push("/");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message || "Registration failed")
          : "Registration failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-lg p-6" style={{ borderColor: "#e5e7eb", background: "#ffffff" }}>
        <h1 className="text-xl font-semibold mb-1" style={{ color: "#0f172a" }}>Create account</h1>
        <p className="text-sm mb-4" style={{ color: "#475569" }}>
          Sign up to start managing your notes.
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
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
          <button
            className="btn w-full"
            style={{ background: APP_COLORS.accent, color: "#111827" }}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-sm mt-4" style={{ color: "#475569" }}>
          Already have an account?{" "}
          <Link href="/login" className="underline" style={{ color: APP_COLORS.primary }}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
