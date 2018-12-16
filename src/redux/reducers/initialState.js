const totalCols = 100
const totalRows = 100

const getStartingWidths = (totalCols) => {
    const widths = []
    for (let colIdx = 0; colIdx < totalCols; colIdx++) {
      widths.push(100)
    }
    return widths
}

const getStartingHeights = (totalRows) => {
    const heights = []
    for (let rowIdx = 0; rowIdx < totalCols; rowIdx++) {
      heights.push(27)
    }
    return heights
}

const getStartingGridValues = (totalCols, totalRows) => {
    const grid = []
    for (let rowIdx = 0; rowIdx < totalRows; rowIdx++) {
      const row = []
      for (let colIdx = 0; colIdx < totalCols; colIdx++) {
          row.push({
            enteredValue: '',
            displayValue: '',
            calculatedValue: '',
          })
      }
      grid.push(row)
    }
    return grid
}


const blankState = {
    totalRows,
    totalCols,
    cursorLocation: [0,0],
    editingLocation: false,
    values: getStartingGridValues(totalCols, totalRows),
    gridShifted: false,
    viewport: [0,0],
    viewportBottom: null,
    viewportRight: null,
    widths: getStartingWidths(totalCols),
    heights: getStartingHeights(totalRows),
}

const localState = localStorage.getItem('rcell')
const initialState = localState ? JSON.parse(localState) : blankState
initialState.viewportRight = 20
initialState.viewportBottom = 20
initialState.widths = getStartingWidths(initialState.totalCols)
initialState.heights = getStartingHeights(initialState.totalRow)
initialState.viewport = [0, 0]
initialState.cursorLocation = [0, 0]
export default initialState