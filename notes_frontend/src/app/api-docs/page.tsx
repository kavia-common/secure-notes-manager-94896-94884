export default function ApiDocsInfo() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-xl font-semibold mb-2" style={{ color: "#0f172a" }}>
          API Usage Notes
        </h1>
        <p className="text-sm text-slate-700">
          This frontend communicates with a REST backend using the environment variable
          NEXT_PUBLIC_API_BASE_URL. No WebSocket endpoints are used in this project.
        </p>
      </div>
    </main>
  );
}
