const totalCols = 30
const totalRows = 30

const getStartingGridValues = (totalCols, totalRows) => {
  const grid = []
  for (let rowIdx = 0; rowIdx < totalRows; rowIdx++) {
    const row = []
    for (let colIdx = 0; colIdx < totalCols; colIdx++) {
      row.push('')
    }
    grid.push(row)
  }
  grid[2][2] = 'Richie'
  grid[3][3] = 'is'
  grid[4][4] = 'cool'
  return grid
}


 const initialState = {
  totalRows,
  totalCols,
  cursorLocation: [0,0],
  editingLocation: false,
  values: getStartingGridValues(totalCols, totalRows),
}

export default initialState