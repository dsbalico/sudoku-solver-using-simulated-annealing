// Check if cell value has duplicates in its column, row, and window
export const isDuplicate = (value: number, row: number, col: number, board:number[][]): boolean => {
    const rowValues = board[row];
    if (rowValues.filter((num) => num === value).length > 1) {
        return true;
    }

    const colValues = board.map((row) => row[col]);
    if (colValues.filter((num) => num === value).length > 1) {
        return true;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    const boxValues = board
        .slice(boxRow, boxRow + 3)
        .reduce((acc, row) => acc.concat(row.slice(boxCol, boxCol + 3)), []);
    if (boxValues.filter((num) => num === value).length > 1) {
        return true;
    }

    return false;
};