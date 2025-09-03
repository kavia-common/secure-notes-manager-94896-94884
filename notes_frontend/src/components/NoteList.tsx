"use client";

import React from "react";
import { APP_COLORS } from "@/lib/config";
import { Note } from "@/lib/api";

type NoteListProps = {
  notes: Note[];
  activeId?: string | null;
  onSelect: (id: string) => void;
};

export default function NoteList({ notes, activeId, onSelect }: NoteListProps) {
  if (!notes.length) {
    return (
      <div className="px-3 py-2 text-sm" style={{ color: "#475569" }}>
        No notes found.
      </div>
    );
  }

  return (
    <ul role="list" aria-label="Notes list">
      {notes.map((n) => {
        const active = n.id === activeId;
        return (
          <li key={n.id}>
            <button
              onClick={() => onSelect(n.id)}
              className="w-full text-left px-3 py-2"
              style={{
                background: active ? "#e2e8f0" : "transparent",
                color: "#0f172a",
                borderLeft: active ? `3px solid ${APP_COLORS.primary}` : "3px solid transparent",
              }}
              aria-current={active ? "true" : "false"}
            >
              <div className="text-sm font-medium truncate">{n.title || "Untitled"}</div>
              <div className="text-xs truncate" style={{ color: "#64748b" }}>
                {new Date(n.updated_at || n.created_at).toLocaleString()}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
