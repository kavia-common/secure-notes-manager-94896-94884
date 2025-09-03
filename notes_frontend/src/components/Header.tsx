"use client";

import React from "react";
import { APP_COLORS, APP_NAME } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type HeaderProps = {
  onNewNote?: () => void;
};

export default function Header({ onNewNote }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header
      className="w-full border-b"
      style={{ borderColor: "rgba(0,0,0,0.06)", background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: APP_COLORS.primary, color: "white" }}
            aria-label="App logo"
          >
            S
          </div>
          <h1 className="text-lg font-semibold" style={{ color: "#0f172a" }}>
            {APP_NAME}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {onNewNote && (
            <button
              onClick={onNewNote}
              className="px-3 py-2 rounded-md text-sm font-medium"
              style={{
                background: APP_COLORS.primary,
                color: "white",
              }}
              aria-label="Create new note"
            >
              + New Note
            </button>
          )}
          {user ? (
            <>
              <span className="text-sm" style={{ color: "#0f172a" }}>
                {user.email}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium border"
                style={{
                  borderColor: APP_COLORS.secondary,
                  color: APP_COLORS.secondary,
                }}
                aria-label="Sign out"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-sm font-medium"
                style={{
                  border: `1px solid ${APP_COLORS.primary}`,
                  color: APP_COLORS.primary,
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 rounded-md text-sm font-medium"
                style={{
                  background: APP_COLORS.accent,
                  color: "#111827",
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
