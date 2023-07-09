import INITIAL_STATE from "../INITIAL_STATE";
import SudokuSolver from "./SudokuSolver";

class SudokuGenerator {
    private grid: number[][];

    constructor() {
        this.grid = [];
        for (let i = 0; i < 9; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 9; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    private clearBoard(): void {
        for(let y = 0; y < 9; y++) {
            for(let x = 0; x < 9; x++) {
                this.grid[y][x] = 0;
            }
        }
    }

    private solveSudoku(): void {
        console.log("Solving sudoku from generator.");
        const solver = new SudokuSolver(this.grid, INITIAL_STATE.maxIter, 
                                        INITIAL_STATE.initTemp, 
                                        INITIAL_STATE.coolingRate, 
                                        INITIAL_STATE.reheatTo, 
                                        INITIAL_STATE.reheatForX);
        let isSolved = false;
        
        // Run the solver until the sudoku is solved.
        while (!isSolved) {
            const result = solver.solveSudoku();
    
            if (result[1] === true) {
                this.grid = result[0];
                isSolved = true; // Set the flag to exit the loop
            }
        }
    }
    

    private removeCells(cellsToRemove: number): void {
        let count = 0;

        while (count < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.grid[row][col] !== 0) {
                this.grid[row][col] = 0;
                count++;
            }
        }
    }

    public generateEasyPuzzle(): number[][] {
        this.clearBoard();
        this.solveSudoku();
        this.removeCells(20);
        console.log("[Easy] 20 numbers removed.");
        return this.grid;
    }

    public generateMediumPuzzle(): number[][] {
        this.clearBoard();
        this.solveSudoku();
        this.removeCells(45);
        console.log("[Medium] 45 numbers removed.");
        return this.grid;
    }

    public generateHardPuzzle(): number[][] {
        this.clearBoard();
        this.solveSudoku();
        this.removeCells(61);
        console.log("[Hard] 61 numbers removed.");
        return this.grid;
    }
}

export default SudokuGenerator