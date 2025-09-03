"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NoteList from "@/components/NoteList";
import NoteEditor from "@/components/NoteEditor";
import { NotesAPI, Note } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const token = user?.token;
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) || null,
    [notes, activeId]
  );
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  async function loadNotes(currentQuery?: string) {
    if (!token) return;
    setListLoading(true);
    setListError(null);
    try {
      const data = await NotesAPI.list(token, currentQuery ?? query);
      setNotes(data);
      if (data.length && !activeId) {
        setActiveId(data[0].id);
      } else if (!data.length) {
        setActiveId(null);
      }
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message || "Failed to load notes")
          : "Failed to load notes";
      setListError(msg);
    } finally {
      setListLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      loadNotes(query);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function handleNewNote() {
    if (!token) return;
    const draft: Partial<Note> = { title: "Untitled", content: "" };
    const created = await NotesAPI.create(token, draft);
    await loadNotes();
    setActiveId(created.id);
  }

  async function handleSave(payload: { title: string; content: string }) {
    if (!token) return;
    if (activeNote) {
      const updated = await NotesAPI.update(token, activeNote.id, payload);
      setNotes((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
    } else {
      const created = await NotesAPI.create(token, payload);
      setNotes((prev) => [created, ...prev]);
      setActiveId(created.id);
    }
  }

  async function handleDelete() {
    if (!token || !activeNote) return;
    await NotesAPI.remove(token, activeNote.id);
    const idx = notes.findIndex((n) => n.id === activeNote.id);
    const nextActive =
      notes[idx + 1]?.id || notes[idx - 1]?.id || null;
    await loadNotes();
    setActiveId(nextActive);
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-slate-700">Loading...</div>
      </main>
    );
  }

  return (
    <main className="container-page">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header onNewNote={handleNewNote} />
      </div>

      <div className="w-full flex pt-[57px]">
        <Sidebar query={query} onQueryChange={setQuery}>
          {listLoading ? (
            <div className="px-3 py-2 text-sm text-slate-600">Loading...</div>
          ) : listError ? (
            <div className="px-3 py-2 text-sm text-red-600">{listError}</div>
          ) : (
            <NoteList
              notes={notes}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
            />
          )}
        </Sidebar>

        <section className="flex-1">
          <NoteEditor
            note={activeNote}
            onSave={handleSave}
            onDelete={activeNote ? handleDelete : undefined}
            isNew={!activeNote}
          />
        </section>
      </div>
    </main>
  );
}
