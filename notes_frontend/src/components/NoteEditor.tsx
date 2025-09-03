"use client";

import React, { useEffect, useState } from "react";
import { APP_COLORS } from "@/lib/config";
import { Note } from "@/lib/api";

type NoteEditorProps = {
  note?: Note | null;
  onSave: (payload: { title: string; content: string }) => Promise<void>;
  onDelete?: () => Promise<void>;
  isNew?: boolean;
};

export default function NoteEditor({ note, onSave, onDelete, isNew }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setError(null);
  }, [note?.id, note?.title, note?.content]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await onSave({ title, content });
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message || "Failed to save")
          : "Failed to save";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-[calc(100vh-57px)] overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: "#0f172a" }}>
            {isNew ? "New Note" : "Edit Note"}
          </h2>
          <div className="flex items-center gap-2">
            {onDelete && !isNew && (
              <button
                onClick={onDelete}
                className="px-3 py-2 rounded-md text-sm font-medium border"
                style={{ borderColor: "#ef4444", color: "#ef4444" }}
                aria-label="Delete note"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60"
              style={{ background: APP_COLORS.primary, color: "white" }}
              aria-label="Save note"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="mb-3 px-3 py-2 rounded-md text-sm"
            style={{ background: "#fee2e2", color: "#991b1b" }}
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="title" className="block text-sm mb-1" style={{ color: "#334155" }}>
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              className="w-full px-3 py-2 rounded-md text-sm outline-none"
              style={{
                border: `1px solid #cbd5e1`,
                background: "#ffffff",
                color: "#0f172a",
              }}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm mb-1" style={{ color: "#334155" }}>
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={16}
              className="w-full px-3 py-2 rounded-md text-sm outline-none"
              style={{
                border: `1px solid #cbd5e1`,
                background: "#ffffff",
                color: "#0f172a",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
