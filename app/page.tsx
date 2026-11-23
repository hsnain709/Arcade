import Link from "next/link";
import Minesweeper from "./minesweeper/page";

const GAMES = [
  {
    title: "Minesweeper",
    description: "Classic mine-sweeping with three difficulties.",
    href: "/minesweeper",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-2">Arcade</h1>
      <p className="text-gray-400 mb-8">Games and tools I built.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="block rounded-lg border border-slate-600 bg-slate-800 hover:border-yellow-500"
          >
            <h2 className="text-2xl font-semibold tex-white">{game.title}</h2>
            <p className="text-gray-400 mt-2">{game.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
