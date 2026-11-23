export type Cell = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};

const NEIGHBORS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
];

export function createGrid(rows: number, cols: number): Cell[][] {
    return Array.from( { length: rows }, () =>
        Array.from( {length: cols}, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
        })))
}

export function placeMines(grid: Cell[][], mineCount: number, safeR = -1, safeC = -1): Cell[][] {
    const copy = grid.map(row => row.map(cell => ({ ...cell})));
    const rows = copy.length;
    const cols = copy[0].length;
    let placed = 0

    while (placed < mineCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);

        if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
        if (copy[r][c].isMine) continue;

        copy[r][c].isMine = true;
        placed++;
    }

    return copy
}

export function countNeighbors(grid: Cell[][]): Cell[][] {
        const rows = grid.length;
        const cols = grid[0].length;
    
        return grid.map((row, r) =>
            row.map((current, c): Cell => {
            let count = 0

            for (const [dr, dc] of NEIGHBORS) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                
                if (grid[nr][nc].isMine) count++;
            }

            return { ...current, neighborMines: count}
            })
        );
    }

export function revealCell(grid: Cell[][], r: number, c: number): Cell[][] {
    if (grid[r][c].isRevealed) return grid;

    const copy = grid.map(row => row.map(cell => ({ ...cell })));
    const rows = copy.length;
    const cols = copy[0].length;
    const queue: [number, number][] = [[r, c]]

    while (queue.length > 0) {
        const [cr, cc] = queue.pop()!;
        const cell = copy[cr][cc];

        if (cell.isRevealed) continue;    
        cell.isRevealed = true;
        
        if (cell.neighborMines === 0) {
            for (const [dr, dc] of NEIGHBORS) {
                const nr = cr + dr;
                const nc = cc + dc;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                if (!copy[nr][nc].isMine) queue.push([nr, nc])
            }
        }
    }
    return copy;
}

export function toggleFlag(grid: Cell[][], r: number, c: number): Cell[][] {
    if (grid[r][c].isRevealed) return grid;

    const copy = grid.map(row => row.map(cell => ({ ...cell })));
    copy[r][c].isFlagged ? copy[r][c].isFlagged = false : copy[r][c].isFlagged = true;

    return copy;
}

export function revealAllMines(grid: Cell[][]): Cell[][] {
    return grid.map((row) => 
        row.map(cell => (cell.isMine ? { ...cell, isRevealed: true} : { ...cell })))
}