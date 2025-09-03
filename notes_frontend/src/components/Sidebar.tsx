"use client";

import React from "react";
import { APP_COLORS } from "@/lib/config";

type SidebarProps = {
  query: string;
  onQueryChange: (v: string) => void;
  children?: React.ReactNode; // Note list
};

export default function Sidebar({ query, onQueryChange, children }: SidebarProps) {
  return (
    <aside
      className="w-72 shrink-0 border-r h-[calc(100vh-57px)] flex flex-col"
      style={{ borderColor: "rgba(0,0,0,0.06)", background: "#f8fafc" }}
      aria-label="Notes sidebar"
    >
      <div className="p-3">
        <label htmlFor="search" className="sr-only">
          Search notes
        </label>
        <input
          id="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search notes..."
          className="w-full px-3 py-2 rounded-md text-sm outline-none"
          style={{
            border: `1px solid ${APP_COLORS.secondary}`,
            background: "#ffffff",
            color: "#0f172a",
          }}
        />
      </div>
      <div className="overflow-y-auto">{children}</div>
    </aside>
  );
}
