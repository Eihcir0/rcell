const totalCols = 30
const totalRows = 30

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


 const initialState = {
  totalRows,
  totalCols,
  cursorLocation: [0,0],
  editingLocation: false,
  values: getStartingGridValues(totalCols, totalRows),
}

export default initialState