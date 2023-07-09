import { random, sample } from 'lodash';

class SudokuSolver {
    maxIteration: number;
    initialTemperature: number;
    coolingRate: number;
    emptyCells: [number, number][];
    initialBoard: number[][];
    reheatTo: number;
    reheatAfterX: number;

    constructor(board: number[][], maxIteration: number, initialTemperature: number, coolingRate: number, reheatTo: number, reheatAfterX: number) {
        console.log("Sudoku Solver Initialized");

        this.maxIteration = maxIteration;
        this.initialTemperature = initialTemperature;
        this.coolingRate = coolingRate;
        this.reheatTo = reheatTo;
        this.reheatAfterX = reheatAfterX;

        this.emptyCells = this.getEmptyCells(board);
        this.initialBoard = this.initializeBoard(board);
    }

    getEmptyCells(board: number[][]): [number, number][] {
        const emptyCells: [number, number][] = [];

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (!board[row][col]) emptyCells.push([row, col]);
            }
        }

        return emptyCells;
    }

    initializeBoard(board: number[][]): number[][] {
        const newBoard: number[][] = board.map((row) => [...row]);

        board.forEach((row, y) => {
            let numbers: number[] = [];

            row.forEach((col) => {
                if (col !== 0) numbers.push(col);
            });

            row.forEach((col, x) => {
                if (col === 0) {
                    while (true) {
                        let candidate = random(1, 9);

                        if (!numbers.includes(candidate)) {
                            newBoard[y][x] = candidate;
                            numbers.push(candidate);

                            break;
                        }
                    }
                }
            });
        });

        console.log("Board initialization complete.");
        return newBoard;
    }

    getListCost(arr: any[]): number {
        let cost = 0;

        // Increment cost by 1, if there's a repeated element
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) { 
                if (arr[i] === arr[j]) cost += 1;
            }
        }

        return cost;
    }

    getSudokuCost(board: number[][]): number {
        let cost = 0;

        // Iterate over each row in the board.
        for (let y = 0; y < 9; y++) {
            cost += this.getListCost(board[y]);
        }

        // Iterate over each column in the board.
        for (let x = 0; x < 9; x++) {
            const col = board.map(row => row[x]);
            cost += this.getListCost(col);
        }

        // Iterate over each sub-grid in the board.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const subgrid = [];
                for (let y = i * 3; y < (i + 1) * 3; y++) {
                    for (let x = j * 3; x < (j + 1) * 3; x++) {
                        subgrid.push(board[y][x]);
                    }
                }
                cost += this.getListCost(subgrid);
            }
        }

        return cost;
    }

    generateNeighbor(board: number[][]): number[][] {
        const newBoard: number[][] = board.map(row => [...row]);
        let cell1: [number, number] | undefined, cell2: [number, number] | undefined;
        
        // Randomly choose two cells that can be switched (this.emptyCells)
        while (true) {
            cell1 = sample(this.emptyCells);
            cell2 = sample(this.emptyCells);
    
            if (cell1 && cell2 && (cell1[0] !== cell2[0] || cell1[1] !== cell2[1])) break;
        }
        
        // Switch the values of the two cells
        if (cell1 && cell2) {
            const temp = newBoard[cell1[0]][cell1[1]];

            newBoard[cell1[0]][cell1[1]] = newBoard[cell2[0]][cell2[1]];
            newBoard[cell2[0]][cell2[1]] = temp;
        }
    
        return newBoard;
    }    
    
    solveSudoku(): [number[][], boolean, number] {
        console.log("Solving Sudoku using Simulated Annealing...");
        console.log(`Parameters:
            Max Iteration: ${this.maxIteration}
            Initial Temperature: ${this.initialTemperature}
            Cooling Rate: ${this.coolingRate}
            Reheat X: ${this.reheatTo}
            Reheat after ${this.reheatAfterX} times`);

        let current_state: number[][] = this.initialBoard.map(row => [...row]);

        let current_cost: number = this.getSudokuCost(current_state);

        let current_temperature: number = this.initialTemperature;
        let iteration: number = 0;

        while (iteration < this.maxIteration) {
            // Sudoku is solved if the current cost is 0
            if (current_cost === 0) {
                console.log(`Sudoku Solved!\nIterations: ${iteration}`);

                return [current_state, true, iteration];
            }
            
            // Reheat the annealer
            if(iteration % this.reheatAfterX === 0) current_temperature = this.reheatTo;

            const new_state: number[][] = this.generateNeighbor(current_state);
            const new_cost: number = this.getSudokuCost(new_state);
            const delta_cost: number = new_cost - current_cost;

            if (delta_cost < 0) {
                current_state = [...new_state];
                current_cost = new_cost;

            } else {
                const acceptance_probability: number = Math.exp(-delta_cost / current_temperature);

                if (Math.random() < acceptance_probability) {
                    current_state = new_state.map((row) => [...row]);
                    current_cost = new_cost;
                }
            }

            iteration++;
            current_temperature *= this.coolingRate;
        }

        console.log(`Can't solve sudoku after ${iteration} iterations.\nSudoku board may be invalid or there's is something wrong with my parameters or you can just try to solve it again.`);
        return [current_state, false, iteration];
    }

}

export default SudokuSolver