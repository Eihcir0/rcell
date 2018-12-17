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

// export const updateDependentsOfProviders = (grid, newCell, oldCell) => {
//     let oldProviders = oldCell.providers
//     let newProviders = newCell.providers
//     for (let oldProvider of oldProviders) {
//         if (!newProviders.includes(oldProvider)) {

//         }
//     }
// }


export const updateGrid = (grid, changedCells) => {
    for (let changedCell of changedCells) {
        grid[changedCell.row][changedCell.col] = changedCell
    }
    return grid
}

export const updateCellAndGrid = (props) => {
    const action = props.action
    let grid = props.grid
    const oldCell = { ...grid[action.row][action.col] }
    const cellValues = parseAndEvaluate({ action, grid })
    const changedCells = []
    const newCell = {
        ...oldCell,
        ...cellValues,
    }
    changedCells.push(newCell)
    // grid = updateDependentsOfProviders(grid, newCell, oldCell)
    // if (!cellValues.error) {
    //     //iterate through dependents
    // }
    return updateGrid(grid, changedCells)

    ///update dependents of providers based on new/old
    /// at reducer level, update all dependents
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

export const checkProviderWasVisited = (provider, visiteds) => {
    return visiteds[provider[0]] && visiteds[provider[0]][provider[1]]
}

const getNewProviders = (string) => {

    let working = removeLeadingEquals(string)
    let matched = CELL_REFERENCE_REGEX.exec(working)
    const results = new Set()
    while (matched) {
        results.add(matched[0])
        working = working.replace(matched[0], '')
        matched = CELL_REFERENCE_REGEX.exec(working)
    }
    return [...results].map(cellToRowCol)
}

export const checkCyclic = (rc, grid, visiteds) => {
    const cell = grid[rc[0]][rc[1]]
    const providers = cell.providers || []
    if (providers.length === 0) return false
    for (let provider of providers) {
        if (checkProviderWasVisited(provider, visiteds)) {
            return true
        }
        visiteds[rc[0]] = {
            ...visiteds[rc[0]],
            [rc[1]]: true,
        }
        if (checkCyclic(provider, grid, visiteds)) {
            return true
        }
    }
    return false
}

export const acyclic = ({ action, grid }) => {
    debugger
    const visiteds = {
        [action.row]: {
            [action.col]: true
        }
    }
    const newProviders = getNewProviders(action.value)
    for (let provider of newProviders) {
        if (checkCyclic(provider, grid, visiteds)) return false
    }
    return true
    
}

export const parseAndEvaluate = ({ action, grid }) => {
    let calculatedValue
    let error
    if (action.value !== undefined && isFormula(action.value)) {
        if (acyclic({action, grid})) {
            const withCellValues = parseCellValues({ value: removeLeadingEquals(action.value), grid })
            try {
                calculatedValue = eval(withCellValues)
            }
            catch (err) {
                calculatedValue = '!!ERROR'
                error = '!!ERROR'
            }
        } else {
            calculatedValue = '!!Circular Reference'
            error = '!!Circular Reference'
        }
    } else {
        calculatedValue = action.value
    }
    const providers = getNewProviders(action.value)

    return {
        providers,
        calculatedValue,
        enteredValue: action.value,
        displayValue: calculatedValue,
        error,
    }
}
