import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold">B</div>
            <div>
              <div className="font-semibold">Bitly Clone</div>
              <div className="text-sm text-slate-500">Premium URL shortener</div>
            </div>
          </div>
          <nav className="flex gap-6 items-center">
            <Link href="/">Dashboard</Link>
            <Link href="/health">Health</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-[70vh]">{children}</main>
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-500">Built with ❤️ Tailwind + Next.js</div>
      </footer>
    </div>
  );
}
