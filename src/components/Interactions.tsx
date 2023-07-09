import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import INITIAL_STATE from '../INITIAL_STATE';
import SudokuGenerator from './../algorithm/SudokuGenerator';
import SudokuSolver from './../algorithm/SudokuSolver';
import { Props } from './SudokuBoard';

function Interactions({setState, state}: Props) {
    // Solve the sudoku board using Simulated Annealing
    const solveSudoku = (): void => {
		setState((prevState) => ({ ...prevState, loading: { ...prevState.loading, solve: true } }));

		setTimeout(() => {
			const solver = new SudokuSolver(state.board, state.maxIter, state.initTemp, state.coolingRate, state.reheatTo, state.reheatForX);
			const solvedBoard = solver.solveSudoku();

			setState((prevState) => ({
				...prevState,
				solved: solvedBoard[1],
				notSolved: !solvedBoard[1],
				iterations: solvedBoard[2],
				board: solvedBoard[0],
				emptyCells: solver.emptyCells,
				loading: { ...prevState.loading, solve: false },
			}));
		}, 100);
	};

    // Generate a sudoku puzzle
	const generateSudoku = (difficulty: string): void => {
		const generator = new SudokuGenerator();

		setState((prevState) => ({
			...prevState,
			emptyCells: [],
			loading: { ...prevState.loading, [difficulty]: true },
		}));

		setTimeout(() => {
			let generatedPuzzle: number[][];

			if (difficulty === "easy")
				generatedPuzzle = generator.generateEasyPuzzle();
			else if (difficulty === "medium")
				generatedPuzzle = generator.generateMediumPuzzle();
			else if (difficulty === "hard")
				generatedPuzzle = generator.generateHardPuzzle();

			setState((prevState) => ({
				...prevState,
				board: generatedPuzzle,
				loading: { ...prevState.loading, [difficulty]: false },
				solved: false,
				notSolved: false,
			}));
		}, 100);
	};

    // Only clear the answers given by the Simulated Annealing
	const clearAnswers = (): void => {
		const newBoard = [...state.board];
		state.emptyCells?.forEach((cell) => {
			newBoard[cell[0]][cell[1]] = 0;
		});

		setState((prevState) => ({
			...prevState,
			board: newBoard,
			solved: false,
			loading: { ...prevState.loading, solve: false },
			notSolved: false,
		}));
	};

    // Clear all values in the board
	const clearBoard = (): void => {
		const newBoard = [...state.board];
		for (let y = 0; y < state.board.length; y++) {
			for (let x = 0; x < state.board.length; x++) {
				newBoard[y][x] = 0;
			}
		}
		setState((prevState) => ({
			...prevState,
			board: newBoard,
			solved: false,
			loading: { ...prevState.loading, solve: false },
			notSolved: false,
		}));
	};

    // Reset advanced settings values to default values
    const resetSettings = () => {
		setState((prevState) => ({
			...prevState,
			maxIter: INITIAL_STATE.maxIter,
			initTemp: INITIAL_STATE.initTemp,
			coolingRate: INITIAL_STATE.coolingRate,
			reheatForX: INITIAL_STATE.reheatForX,
			reheatTo: INITIAL_STATE.reheatTo,
		}));
	};

    const {
		loading: { solve, easy, medium, hard },
		openAS,
		solved,
		notSolved,
	} = state;

    return (
        <div className='self-center mt-2 lg:mt-0'>
            <h5 className='text-gray-500 dark:text-gray-50'>Generate a sudoku puzzle</h5>
            
			{/* Generate Sudoku Buttons */}
			<div className='flex gap-2'>
                <button onClick={() => generateSudoku("easy")} className='bg-green-500 dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-700 transition rounded-sm w-full text-white py-2 flex gap-2 justify-center'>
                    { easy ? <AiOutlineLoading3Quarters className="self-center animate-spin" /> : null } Easy
                </button>
                <button onClick={() => generateSudoku("medium")} className='bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-700 rounded-sm w-full text-white py-2 flex gap-2 justify-center'>
                    { medium ? <AiOutlineLoading3Quarters className="self-center animate-spin" /> : null } Medium
                </button>
                <button onClick={() => generateSudoku("hard")} className='bg-red-500 dark:bg-red-600 hover:bg-red-400 rounded-sm dark:hover:bg-red-700 text-white w-full py-2 flex gap-2 justify-center'>
                    { hard ? <AiOutlineLoading3Quarters className="self-center animate-spin" /> : null } Hard
                </button>
            </div>

			{/* Clear Buttons */}
            <div className='grid grid-cols-2 gap-2'>
                <button onClick={clearAnswers} className='bg-gray-500 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 rounded-sm w-full text-white py-2 mt-2'>Clear Answers</button>
                <button onClick={clearBoard} className='bg-gray-500 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 rounded-sm w-full text-white py-2 mt-2'>Clear Board</button>
            </div>

			{/* Advanced Settings */}
            <button onClick={() => setState((prevState) => ({ ...prevState, openAS: !prevState.openAS }))} className='text-lg mt-2 text-gray-500 hover:text-sky-500 transition dark:text-gray-50'>⚙️ <span className='underline'>Advanced Settings</span></button>
            <p className='text-xs text-gray-500 dark:text-gray-400'>Exercise caution when making modifications to these settings, as it has the potential to cause page to be unresponsive.</p>
            { 
                openAS ? (
                    <div className='py-2 px-4 border-2 bg-gray-100 dark:border-gray-700 dark:text-gray-50 dark:bg-gray-900 border-dashed rounded-sm my-2'>
                        <div className='grid grid-cols-2 gap-2'>
                            <div>
                                <label className='block text-xs'>Max Iteration</label>
                                <input value={state.maxIter} onChange={(e) => setState((prevState) => ({ ...prevState, maxIter: parseFloat(e.target.value) }))} className='text-sky-500 w-full border dark:border-gray-700 px-4 py-1 rounded-sm text-sm dark:bg-gray-800' type="number" min="1000" placeholder='Max Iteration' />
                            </div>
                            <div>
                                <label className='block text-xs'>Initial Temperature</label>
                                <input value={state.initTemp} onChange={(e) => setState((prevState) => ({ ...prevState, initTemp: parseFloat(e.target.value) }))} step="0.01" className='text-sky-500 w-full border px-4 py-1 rounded-sm text-sm dark:border-gray-700 dark:bg-gray-800' type="number" min="0.2" max="2" placeholder='Initial Temperature' />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <div>
                                <label className='block text-xs'>Cooling Rate</label>
                                <input value={state.coolingRate} onChange={(e) => setState((prevState) => ({ ...prevState, coolingRate: parseFloat(e.target.value) }))} step="0.001" className='text-sky-500 w-full border px-4 py-1 rounded-sm text-sm dark:border-gray-700 dark:bg-gray-800' type="number" min="0.05" max="0.999" placeholder='Cooling Rate' />
                            </div>
                            <div>
                                <label className='block text-xs'>Reheat</label>
                                <input value={state.reheatTo} onChange={(e) => setState((prevState) => ({ ...prevState, reheatTo: parseFloat(e.target.value) }))} step="0.01" className='text-sky-500 w-full border px-4 py-1 rounded-sm text-sm dark:border-gray-700 dark:bg-gray-800' type="number" min="0.1" max="2" placeholder='Reheat' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <div>
                                <label className='block text-xs'>Reheat for every x iterations</label>
                                <input value={state.reheatForX} onChange={(e) => setState((prevState) => ({ ...prevState, reheatForX: parseFloat(e.target.value) }))} min="100" className='text-sky-500 w-full border px-4 py-1 rounded-sm text-sm dark:border-gray-700 dark:bg-gray-800' type="number" placeholder='Reheat for every x iterations' />
                            </div>
                        </div>

                        <button onClick={resetSettings} className='text-xs mt-3 w-full hover:bg-gray-100 hover:text-gray-400 transition bg-gray-200 py-1 rounded-sm text-gray-500 tracking-wide dark:hover:bg-gray-700 dark:text-gray-50 dark:bg-gray-800'>Reset</button>
                    </div>
                ) : (<button onClick={() => setState((prevState) => ({ ...prevState, openAS: !prevState.openAS }))} className='h-2 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-950 dark:border-gray-700 border border-dashed'></button>)
            }

            <hr className='dark:border-gray-900' />

			{/* Solve Button */}
            <button onClick={solveSudoku}
                disabled={solve || solved || notSolved ? true : false}
                className={`mt-2 transition font-medium rounded-sm w-full text-white py-2  ${solved ? "bg-green-500 dark:bg-green-600 disabled:bg-green-300 dark:disabled:bg-green-800 dark:disabled:text-green-400" : notSolved ? "bg-red-500 dark:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-800 dark:disabled:text-red-400" : "bg-sky-500 dark:bg-sky-600 hover:bg-sky-400 disabled:bg-sky-300 dark:hover:bg-sky-700 dark:disabled:bg-sky-800 dark:disabled:text-gray-400"}`}>
                {
                    solve && !solved && !notSolved ? (
                        <span className='flex gap-2 justify-center'><AiOutlineLoading3Quarters className="self-center animate-spin" /> Loading</span>
                    ) : solved ? "Sudoku Solved!" : notSolved ? "Sudoku not Solved!" : "Solve"
                }
            </button>
        </div>
    )
}

export default Interactions