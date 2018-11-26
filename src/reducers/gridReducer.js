import initialState from './initialState';
import { 
  SET_CURSOR,
  SET_EDITING,
  SET_VALUE,
  RESET_STARTING_VALUE,
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
      const calculatedValue = eval(withCellValues)
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

export default function grid(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_EDITING:
      newState = {
        ...state,
        editingLocation: action.off ? false : [action.row, action.col],
        startingValue: action.value,
      }
      return newState
    
    case SET_CURSOR:
      newState = {
        ...state,
        cursorLocation: [action.row, action.col],
      }
      return newState

    case SET_VALUE:
      return parseAndEvaluate({ action, state })
      
    case RESET_STARTING_VALUE:
      newState = {
        ...state,
        startingValue: undefined,
      }
      return newState
      

    default:
    return state;
  }
}


    // case FETCH_STUFF:
    //   return action;
    // case RECEIVE_STUFF:
    //   newState = action.stuff;
    //   return newState;
