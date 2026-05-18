"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Si no hay error, el server action redirige automáticamente a /admin
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[#C8102E] text-xs tracking-[0.3em] uppercase font-mono mb-2">
            Panel de administración
          </p>
          <h1 className="text-[#F5EFE6] text-3xl font-bold tracking-tight uppercase">
            American Prime
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@americanprimeburger.cl"
              className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#6B6660] text-xs uppercase tracking-widest mb-1.5">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-[#F5EFE6] px-4 py-3 text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
            />
          </div>

          {error && <p className="text-[#C8102E] text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8102E] text-[#F5EFE6] py-3 text-sm uppercase tracking-widest font-bold hover:bg-[#8B0A1F] transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
