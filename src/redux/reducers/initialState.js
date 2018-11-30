const totalCols = 30
const totalRows = 30

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
    grid[2][2].displayValue = 'Richie'
    grid[2][2].enteredValue = 'Booyah'
    grid[2][2].calculatedValue = 'Booyah'
    grid[3][3].displayValue = 'is'
    grid[3][3].enteredValue = 'what'
    grid[3][3].calculatedValue = 'what'
    grid[4][4].displayValue = 'cool'
    grid[4][4].enteredValue = 'omg'
    grid[4][4].calculatedValue = 'omg'
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
    viewportBottom__cached: null,
    viewportRight__cached: null,
    widths: getStartingWidths(totalCols),
    heights: getStartingHeights(totalRows),
}

const localState = localStorage.getItem('rcell')
const initialState = localState ? JSON.parse(localState) : blankState
initialState.viewport = [5,5]
initialState.cursorLocation = [5,5]
initialState.viewportRight = 20
initialState.viewportBottom = 20
initialState.widths = getStartingWidths(initialState.totalCols)
initialState.heights = getStartingHeights(initialState.totalRow)
export default initialState