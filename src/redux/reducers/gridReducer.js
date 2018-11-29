/* eslint no-eval: 0 */
import initialState from './initialState';
import { 
  SET_CURSOR,
  SET_EDITING,
  SET_VALUE,
  RESET_STARTING_EDITOR_VALUE,
  TOGGLE_SHIFT_GRID,

  SCROLL_DOWN,
  SCROLL_LEFT,
  SCROLL_RIGHT,
  SCROLL_UP,
  REFRESH_VIEWPORT,

} from '../actions/constants';

const CELL_REFERENCE_REGEX = /[a-zA-Z]+[0-9]+/ //number and a letter adjacent i.e. C3, AE111, etc.

const isFormula = (string) => {
  if (typeof string !== 'string') return false
  return string[0] === '='

}

const removeLeadingEquals = (string) => {
  if (string[0] !== '=') return string
  return string.slice(1)
}

const ABCS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const colFromLetters = (string) => {
  const letters = string.split('')
  if (letters.length === 1) {
    return ABCS.indexOf(letters[0])
  }
}

const cellToRowCol = (cell) => {
  const abcRe = /[a-zA-Z]/
  const letters = []
  let rowNumber
  const splits = cell.split('')
  for (let index = 0; index < splits.length; index++) {
    const char = splits[index]
    if (char.search(abcRe) < 0) {
      rowNumber = cell.slice(index)
      break
    } else {
      letters.push(char.toUpperCase())
    }
  }
  const colLetters = letters.join('')
  const col = colFromLetters(colLetters)
  const row = Number((rowNumber - 1))
  return [row, col]
}

const WIDTH_OFFSET_PX = 0
const HEIGHT_OFFSET_PX = 35

const getViewportWidth = (state) => {
  const {
    widths,
    viewport,
    totalCols,
  } = state
  let counter = viewport[1]
  let width = Number(widths[counter])
  for (let idx = counter; idx < totalCols; idx++) {
    if ((width + Number(widths[idx])) < window.outerWidth - WIDTH_OFFSET_PX) {
      counter++
      width += Number(widths[idx])
    } else {
      break
    }
  }
  console.log('viewportWidth(cols):', (counter + 2))
  return counter + 2

}

const getViewportHeight = (state) => {
  const {
    heights,
    viewport,
    totalRows,
  } = state
  let counter = viewport[1]
  let height = Number(heights[viewport[1]])
  for (let idx = counter; idx < totalRows; idx++) {
    if ((height + Number(heights[idx])) < window.outerHeight - HEIGHT_OFFSET_PX) {
      counter++
      height += Number(heights[idx])
    } else {
      break
    }
  }
  console.log('viewportHeight(rows):', counter + 1)
  return counter + 1

}


const parseCellValues = ({ value, grid }) => {
  const matched = value.match(CELL_REFERENCE_REGEX)
  if (matched === null) return value
  const cell = matched[0]
  const cellReferenceLocation = cellToRowCol(cell)
  const cellRow = cellReferenceLocation[0]
  const cellCol = cellReferenceLocation[1]
  const cellValue = String(grid[cellRow][cellCol].calculatedValue)
  const newValue = value.replace(cell, cellValue)
  return parseCellValues({value: newValue, grid })
}

const parseAndEvaluate = ({ action, state }) => {
  const newValues = { ...state.values}
  const newState = {
    ...state
  }
  if (action.value !==undefined && isFormula(action.value)) {
    const withCellValues = parseCellValues({ value: removeLeadingEquals(action.value), grid: state.values})
    let calculatedValue
    try {
      calculatedValue = eval(withCellValues)
    }
    catch(err) {
      calculatedValue = '!!ERROR'
    }
    newValues[action.row][action.col].enteredValue = action.value
    newValues[action.row][action.col].displayValue = calculatedValue
    newValues[action.row][action.col].calculatedValue = calculatedValue

    
  } else {
    newValues[action.row][action.col].enteredValue = action.value
    newValues[action.row][action.col].displayValue = action.value
    newValues[action.row][action.col].calculatedValue = action.value
  }
  
  
  newState.values = newValues
  return newState
}

const offGrid = (state, proposedLocation) => {
  const ret = (
    proposedLocation[0] < 0 ||
    proposedLocation[0] >= state.totalRows ||
    proposedLocation[1] < 0 ||
    proposedLocation[1] >= state.totalCols
  )
  console.log(`${ret ? 'OFFGRID!' : ''}`)
  return ret
}

const checkEdge = (direction, state, newCursorLocation) => {
  switch (direction) {
    case 'left':
      return newCursorLocation[1] === state.viewport[1] 
        && newCursorLocation[1] !== 0

    case 'right':
      return newCursorLocation[1] === state.viewport[1] + 14 /* <== needs to be viewport width */ 
        && newCursorLocation[1] !== (state.totalCols - 1)

    case 'top':
      return newCursorLocation[0] === state.viewport[0]
        && newCursorLocation[0] !== 0

    case 'bottom':
      return newCursorLocation[0] === state.viewport[0] + 14 /* SAME! */
        && newCursorLocation[0] !== (state.totalRows - 1)

    default:
      return false
  }
}

const checkEdges = (state, newCursorLocation) => {
  const newViewport = [...state.viewport]
  if (checkEdge('left', state, newCursorLocation)) {
    newViewport[1] -= 1
  }
  if (checkEdge('right', state, newCursorLocation)) {
    newViewport[1] += 1
  }
  if (checkEdge('top', state, newCursorLocation)) {
    newViewport[0] -= 1
  }
  if (checkEdge('bottom', state, newCursorLocation)) {
    newViewport[0] += 1
  }
  return newViewport


}

  
export default function grid(state = initialState, action) {
  let newState
  let viewport
  const viewportRow = state.viewport[0]
  const viewportCol = state.viewport[1]
  switch (action.type) {
    case SET_EDITING:
      newState = {
        ...state,
        editingLocation: action.off ? false : [action.row, action.col],
        cellEditorStartingValue: action.value,
      }
      return newState
    
    case SET_CURSOR:
    if (offGrid(state, [action.row, action.col])) {
      return state
    }
    newState = {
      ...state,
      cursorLocation: [action.row, action.col],
    }

    const newViewport = checkEdges(state, newState.cursorLocation)
    if (newViewport) {
      newState.viewport = newViewport // maybe better to fire action
    }
    return newState
    
    case SET_VALUE:
      newState = parseAndEvaluate({ action, state })
      const widths = []
      for (let i=0; i < 31; i++) {
        widths.push('100')
      }
      widths[4] = '200'

      const heights = []
      for (let i=0; i < 31; i++) {
        heights.push('27')
      }
      heights[4] = '200'
      newState.heights = heights
      localStorage.setItem('rcell', JSON.stringify(newState))
      return newState
      
    case TOGGLE_SHIFT_GRID:
      newState = {
        ...state,
        gridShifted: !state.gridShifted,
      }
      return newState
      
    case RESET_STARTING_EDITOR_VALUE:
      newState = {
        ...state,
        cellEditorStartingValue: undefined,
      }
      return newState
      
    case SCROLL_UP:
      if (viewportRow === 0) return state
      viewport = [(viewportRow - 1), state.viewport[1]]
      newState = {
        ...state,
        viewport,
      }
      return newState
      
    case SCROLL_DOWN:
      if (viewportRow === (state.totalRows - 1)) return state
      viewport = [(viewportRow + 1), state.viewport[1]]
      newState = {
        ...state,
        viewport,
      }
      return newState
      
    case SCROLL_LEFT:
      if (viewportCol === 0) return state
      viewport = [state.viewport[0], (viewportCol - 1), ]
      newState = {
        ...state,
        viewport,
      }
      return newState
      
    case SCROLL_RIGHT:
      if (viewportCol === (state.totalCols - 1)) return state
      viewport = [state.viewport[0], (viewportCol + 1), ]
      newState = {
        ...state,
        viewport,
      }
      return newState

    case REFRESH_VIEWPORT:
      newState = {
        ...state,
        viewportHeight: getViewportHeight(state),
        viewportWidth: getViewportWidth(state),
      }
      console.log(newState.viewportWidth)
      console.log(newState.viewportHeight)
      return newState
      
    default:
      return state;
  }
}
