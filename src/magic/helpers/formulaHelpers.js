/* eslint no-eval: 0 */

const isFormula = (string) => {
    if (typeof string !== 'string') return false
    return string[0] === '='
    
}

const removeLeadingEquals = (string) => {
    if (string[0] !== '=') return string
    return string.slice(1)
}

const ABCS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const colFromLetters = (string) => {
    const letters = string.split('')
    if (letters.length === 1) {
        return ABCS.indexOf(letters[0])
    }
}

export const colLetterFromNumber = (origNum) => {
    let num = origNum + 1
    for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret
    }
    return ret
}



export const cellToRowCol = (cell) => {
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

const CELL_REFERENCE_REGEX = /[a-zA-Z]+[0-9]+/ //number and a letter adjacent i.e. C3, AE111, etc.

export const getCellValueObject = ({ action, grid }) => {
    const oldCell = { ...grid[action.row][action.col] }
    const cellValues = parseAndEvaluate({ action, grid })
    const newCell = {
        ...oldCell,
        ...cellValues,
    }
    return newCell
}

export const parseCellValues = ({ value, grid }) => {
    const matched = value.match(CELL_REFERENCE_REGEX)
    if (matched === null) return value
    const cell = matched[0]
    const cellReferenceLocation = cellToRowCol(cell)
    const cellRow = cellReferenceLocation[0]
    const cellCol = cellReferenceLocation[1]
    const cellValue = String(grid[cellRow][cellCol].calculatedValue)
    const newValue = value.replace(cell, cellValue)
    return parseCellValues({ value: newValue, grid })
}

export const parseAndEvaluate = ({ action, grid }) => {
    let calculatedValue
    if (action.value !== undefined && isFormula(action.value)) {
        const withCellValues = parseCellValues({ value: removeLeadingEquals(action.value), grid })
        try {
            calculatedValue = eval(withCellValues)
        }
        catch (err) {
            calculatedValue = '!!ERROR'
        }
    } else {
        calculatedValue = action.value
    }

    return {
        calculatedValue,
        enteredValue: action.value,
        displayValue: calculatedValue,
    }
}
