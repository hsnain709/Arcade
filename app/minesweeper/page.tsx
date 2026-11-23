"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import type { Cell } from "./logic";
import { FlagIcon, BombIcon } from "./icons";
import { createGrid, placeMines, countNeighbors, revealCell, toggleFlag, revealAllMines } from "./logic";

const NUMBER_COLORS = ["", "#0000FF", "#008000", "#FF0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

const DIFFICULTIES = {
  easy:   { rows: 9,  cols: 9,  mines: 10, size: 60 },
  medium: { rows: 16, cols: 16, mines: 40, size: 40 },
  hard:   { rows: 16, cols: 30, mines: 99, size: 40 },
} as const;

type Difficulty = keyof typeof DIFFICULTIES;

export default function Minesweeper() {
  const [grid, setGrid]= useState<Cell[][]>(() => createGrid(DIFFICULTIES.easy.rows, DIFFICULTIES.easy.cols));
  const [started, setStarted] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const { rows, cols, mines, size} = DIFFICULTIES[difficulty]

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  function newGame(d: Difficulty = difficulty) {
    setDifficulty(d);
    setGrid(createGrid(DIFFICULTIES[d].rows, DIFFICULTIES[d].cols));
    setStarted(false);
    setGameOver(false);
    setGameWon(false);
  }

  function hasWon(grid: Cell[][]): boolean {
    return grid.flat().every(cell => cell.isMine || cell.isRevealed);
  }

  return (
    <div>

      <Link href="/" className="block m-4 text-yellow-500 hover:underline">
        ← Back to menu
      </Link>

      <div className="flex flex-col items-center justify-center mt-4 text-black font-[family-name:var(--font-pixel)]">
        <h1 className=" text-yellow-500 text-7xl mb-2">Minesweeper</h1>
          <div className="flex gap-2 mb-4">
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => newGame(d)}
                className={`px-4 py-2 text-2xl capitalize ${
                  difficulty === d
                    ? "bg-yellow-500 text-black"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        {(gameWon || gameOver) && (
            <div className="mt-1 text-center text-black font-[family-name:var(--font-pixel)]">
              <p className="text-4xl mb-2">{gameWon ? "You win!" : "You lost!"}</p>
            </div>
              )}
        <button onClick={() => newGame()} className="text-3xl px-4 py-2 bg-green-500 rounded">
            New game
        </button>
      </div>

      <div className="flex items-center justify-center mt-2">
        <main>
              <div
                className="grid w-fit"
                style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`}}
              >
          {grid.flat().map((cell, i) => (
              <div
                  key={i}
                  onClick={() => {
                    if (gameOver || gameWon) return;

                    let board = grid;

                    const r = Math.floor(i / cols);
                    const c = i % cols;
                    if (!started) {
                      board = countNeighbors(placeMines(grid, mines, r, c));
                      setStarted(true)
                    }
                    setGrid(revealCell(board, r, c));

                    if (board[r][c].isMine) {
                      setGrid(revealAllMines(board));
                      setGameOver(true);
                      return;
                    }
                    setGrid(revealCell(board, r, c));

                    const next = revealCell(board, r, c);
                    setGrid(next);
                    if (hasWon(next)) setGameWon(true);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    const r = Math.floor(i / cols);
                    const c = i % cols;
                    setGrid(toggleFlag(grid, r, c));
                  }}
                  style={{ width: size, height: size, fontSize: size * 0.6, color: NUMBER_COLORS[cell.neighborMines] }}
                  className={`flex items-center justify-center font-[family-name:var(--font-pixel)]
                      text-white ${cell.isRevealed ? "border-2 border-slate-600 bg-[#C0C0C0]" : "border-6 border-t-slate-200 border-l-slate-200 border-b-slate-600 border-r-slate-600 bg-[#c1c5c8f9] hover:bg-slate-400 cursor-pointer"}`}
              >
                {cell.isRevealed ? (cell.isMine ? <BombIcon /> : cell.neighborMines > 0 ? cell.neighborMines : "") : cell.isFlagged ? <FlagIcon /> : ""}
              </div>
          ))}
          </div>
        </main>
      </div>
    </div>
  );
}
