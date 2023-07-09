import { State } from "../INITIAL_STATE";
import { isDuplicate } from "../utilities/utilities";

export interface Props {
    state: State
    setState: React.Dispatch<React.SetStateAction<State>>;
}

function SudokuBoard({state, setState}: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number): void => {
		const value = parseInt(e.target.value) || 0;
        
		setState((prevState) => {
			const newBoard = [...prevState.board];
			newBoard[row][col] = value;
			return { ...prevState, board: newBoard };
		});
	};

    return (
        <div className='overflow-x-auto mx-auto self-center'>
            <table className="border-collapse mx-auto">
                <tbody>
                    {state.board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                // Make sub-grid borders thicker
                                <td key={colIndex} className={`border border-gray-300 dark:border-gray-500
												${colIndex === 2 || colIndex === 5 ? "border-e-4" : ""} 
												${rowIndex === 2 || rowIndex === 5 ? "border-b-4" : ""}`}>
                                    
                                    {/* Turn mistakes (duplicate numbers in row, column, and subgrid) to red */}
                                    {/* Turn answers (state.emptyCells) to green */}
                                    <input
                                        id="sudokuNumbers" type="number"
                                        min="1" max="9" value={cell || ''} 
                                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                        className={`w-10 h-10 text-center dark:text-gray-50 outline-none dark:bg-gray-900
														${isDuplicate(cell, rowIndex, colIndex, state.board) ? 'font-medium text-red-500 dark:text-red-600'
                                                        : state.emptyCells?.some((cell: [number, number]) => cell[0] === rowIndex &&
                                                            cell[1] === colIndex) ? "font-medium text-green-500 dark:text-green-600" : ''}`}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SudokuBoard