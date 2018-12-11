import {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} from '../../redux/actions/constants';

export const jump = (direction, state) => {
    const {
        cursorLocation,
        values,
        totalCols,
        totalRows,
    } = state

    const _cellEmpty = (location) => {
        return values[location[0]][location[1]].enteredValue === ''
    }

    const _nextNonEmptyCol = (row, col, direction) => {
        let colIdx
        let rowIdx
        if (direction === RIGHT) {
            colIdx = col + 1
            while (colIdx < totalCols) {
                if (!_cellEmpty([row, colIdx])) {
                    return [row, colIdx]
                }
                colIdx++
            }
            return [row, Math.min(colIdx, (totalCols - 1))]
        } else if (direction === LEFT) {
            colIdx = col - 1
            while (colIdx >= 0) {
                if (!_cellEmpty([row, colIdx])) {
                    return [row, colIdx]
                }
                colIdx--
            }
            return [row, Math.max(colIdx, 0)]
        } else if (direction === DOWN) {
            rowIdx = row + 1
            while (rowIdx < totalRows) {
                if (!_cellEmpty([rowIdx, col])) {
                    return [rowIdx, col]
                }
                rowIdx++
            }
            return [Math.min(rowIdx, (totalRows - 1)), col]
        } else if (direction === UP) {
            rowIdx = row - 1
            while (rowIdx >= 0) {
                if (!_cellEmpty([rowIdx, col])) {
                    return [rowIdx, col]
                }
                rowIdx--
            }
            return [0, col]
        }
    }

    const _nextNonEmptyCellFollowedByEmpty = (row, col, direction) => {
        let rowIdx
        let colIdx
        if (direction === RIGHT) {
            colIdx = col + 2
            while (colIdx < totalCols) {
                if (_cellEmpty([row, colIdx])) {
                    return [row, Math.min((totalCols - 1), (colIdx - 1))]
                }
                colIdx++
            }
            return [row, totalCols - 1]
        } else if (direction === LEFT) {
            colIdx = col - 2
            while (colIdx >= 0) {
                if (_cellEmpty([row, colIdx])) {
                    return [row, Math.max(0, colIdx + 1)]
                }
                colIdx--
            }
            return [row, 0]
        } else if (direction === DOWN) {
            rowIdx = row + 2
            while (rowIdx < totalRows) {
                if (_cellEmpty([rowIdx, col])) {
                    return [Math.min(totalRows - 1, rowIdx - 1), col]
                }
                rowIdx++
            }
            return [totalRows - 1, col]
        } else if (direction === UP) {
            rowIdx = row - 2
            while (rowIdx >= 0) {
                if (_cellEmpty([rowIdx, col])) {
                    return [Math.max(0, rowIdx + 1), col]
                }
                rowIdx--
            }
            return [0, col]
        }
    }

    let currCellEmpty
    let nextCellEmpty
    const [row, col] = [cursorLocation[0], cursorLocation[1]]

    if (direction === RIGHT) {
        if (col === totalCols - 1) return cursorLocation
        nextCellEmpty = _cellEmpty([row, col + 1])
    } else if (direction === LEFT) {
        if (col === 0) return cursorLocation
        nextCellEmpty = _cellEmpty([row, col - 1])
    } else if (direction === DOWN) {
        if (row === totalRows - 1) return cursorLocation
        nextCellEmpty = _cellEmpty([row + 1, col])
    } else if (direction === UP) {
        if (row === 0) return cursorLocation
        nextCellEmpty = _cellEmpty([row - 1, col])
    }
    currCellEmpty = _cellEmpty([row, col])
    if (currCellEmpty) {
        return _nextNonEmptyCol(row, col, direction)
    } else if (nextCellEmpty) {
        return _nextNonEmptyCol(row, col, direction)
    } else {
        return _nextNonEmptyCellFollowedByEmpty(row, col, direction)
    }
}
