import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section role="alert" aria-live="assertive" className="text-center">
        <h1 className="text-2xl font-semibold mb-2" style={{ color: "#0f172a" }}>
          404 – Page Not Found
        </h1>
        <p className="text-slate-600">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
