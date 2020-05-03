import {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} from '../../redux/actions/constants';

import {
    checkEdges,
} from '../helpers/gridHelpers'

//Miscellaneous constants
const WIDTH_OFFSET_PX = 0 // NEED TO REVIEW THESE -- for now hacky hardcoding adjustment to counter
const HEIGHT_OFFSET_PX = 100

export const checkOffViewport = ({state, newCursorLocation}) => {
    const {
        viewport,
        viewportRight,
        viewportBottom,
    } = state
    const newViewport = [...viewport]
    let updated = false
    if (newCursorLocation[1] < viewport[1]) {
        newViewport[1] = newCursorLocation[1]
        updated = true
    } else if (newCursorLocation[1] > viewportRight) {
        newViewport[1] = newCursorLocation[1]
        newViewport[1] = Math.min(getViewportLeft({ ...state, viewport: newViewport }), newViewport[1])
        updated = true
    }
    if (newCursorLocation[0] < viewport[0]) {
        newViewport[0] = newCursorLocation[0]
        updated = true
    } else if (newCursorLocation[0] > viewportBottom) {
        newViewport[0] = newCursorLocation[0]
        newViewport[0] = Math.min(getViewportTop({ ...state, viewport: newViewport }), newViewport[0])
        updated = true
    }
    return updated && newViewport
}

export const scroll = (action, state) => {
    const {
        viewportBottom,
        viewportRight,
        totalCols,
        totalRows,
        heights,
        widths,
    } = state

    const [viewportRow, viewportCol] = state.viewport

    let viewport
    let newState
    if (action.direction === UP) {
        if (viewportRow === 0) return state
        viewport = [(viewportRow - action.value), viewportCol]
    } else if (action.direction === DOWN) {
        if (viewportBottom === (totalRows)) return state
        viewport = [(viewportRow + 1), viewportCol]
    } else if (action.direction === LEFT) {
        if (viewportCol === 0) return state
        viewport = [viewportRow, (viewportCol - 1),]
    } else if (action.direction === RIGHT) {
        if (viewportRight === (totalCols)) return state
        viewport = [viewportRow, (viewportCol + 1),]
    }
    newState = {
        ...state,
        viewport,
    }
    newState.viewportBottom = getViewportBottom({ heights, viewport, totalRows })
    newState.viewportRight = getViewportRight({ widths, viewport, totalCols })
    return newState

}

export const getViewportRight = ({ widths, viewport, totalCols }) => {
        let width = widths[viewport[1]]
    let counter = viewport[1] + 1
    for (let idx = counter; idx < totalCols; idx++) {
        if ((width + widths[idx]) < window.outerWidth - WIDTH_OFFSET_PX) {
            counter++
            width += widths[idx]
        } else {
            break
        }
    }
    return counter - 13

}

export const getViewportLeft = (state) => {
    const {
        widths,
        viewport,
    } = state
    let width = widths[viewport[1]]
    let counter = viewport[1] - 1
    for (let idx = counter; idx > 0; idx--) {
        if ((width + widths[idx]) < window.outerWidth - WIDTH_OFFSET_PX) {
            counter--
            width += widths[idx]
        } else {
            break
        }
    }
    return counter + 1

}

export const getViewportTop = (state) => {
    const {
        heights,
        viewport,
    } = state
    let height = heights[viewport[1]]
    let counter = viewport[0] - 1
    for (let idx = counter; idx > 0; idx--) {
        if ((height + heights[idx]) < window.outerHeight - HEIGHT_OFFSET_PX) {
            counter--
            height += heights[idx]
        } else {
            break
        }
    }
    return counter + 5 // hmm this is a little weird here ... why plus 5?

}

export const getViewportBottom = ({ heights, viewport, totalRows }) => {
    let height = heights[viewport[0]]
    let counter = viewport[0] + 1
    for (let idx = counter; idx < totalRows; idx++) {
        if ((height + heights[idx]) < window.innerHeight - HEIGHT_OFFSET_PX) {
            counter++
            height += heights[idx]
        } else {
            break
        }
    }
    return counter  + 5 // hmm this is a little weird here ... why plus 5?
}

export const validatedViewPort = ({ state, newCursorLocation }) => {
    let newViewport = false
    const offViewport = checkOffViewport({ state, newCursorLocation }) // returns false or new viewport values
    if (offViewport) {
        newViewport = offViewport
    } else {
        const onEdge = checkEdges({ state, newCursorLocation })
        if (onEdge) {
            newViewport = onEdge // maybe better to fire action
        }
    }
    const {
        heights,
        widths,
        totalCols,
        totalRows,
    } = state

    if (newViewport) {
        return {
            viewport: newViewport,
            viewportBottom: getViewportBottom({ heights, viewport: newViewport, totalRows }),
            viewportRight: getViewportRight({ widths, viewport: newViewport, totalCols }),
        }
    } else return {}

}
