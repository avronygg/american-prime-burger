import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import Link from "next/link";

const NAV = [
  { href: "/admin",           label: "Dashboard",  icon: "▦" },
  { href: "/admin/productos", label: "Productos",  icon: "☰" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col">

      {/* Top bar */}
      <header className="h-14 border-b border-[#1A1A1A] flex items-center justify-between px-5 md:px-8 bg-[#0F0F0F] sticky top-0 z-40">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <span
              className="text-[#C8102E] text-xs uppercase tracking-[0.3em] font-bold"
              style={{ fontFamily: "var(--font-space-mono, monospace)" }}
            >
              APB
            </span>
            <span className="text-[#2a2a2a] text-xs">|</span>
            <span className="text-[#6B6660] text-xs uppercase tracking-widest hidden sm:block"
              style={{ fontFamily: "var(--font-space-mono, monospace)" }}>
              Admin
            </span>
          </Link>

          {/* Nav links */}
          {session && (
            <nav className="flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1.5 text-[11px] uppercase tracking-widest text-[#6B6660] hover:text-[#F5EFE6] hover:bg-[#1A1A1A] transition-colors rounded-sm"
                  style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session && (
            <>
              <Link
                href="/"
                target="_blank"
                className="text-[11px] uppercase tracking-widest text-[#6B6660] hover:text-[#F5EFE6] transition-colors hidden sm:block"
                style={{ fontFamily: "var(--font-space-mono, monospace)" }}
              >
                Ver sitio ↗
              </Link>
              <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-widest text-[#6B6660] hover:text-[#C8102E] transition-colors"
                  style={{ fontFamily: "var(--font-space-mono, monospace)" }}
                >
                  Salir
                </button>
              </form>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-5 md:p-8 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
