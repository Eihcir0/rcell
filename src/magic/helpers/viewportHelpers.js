import {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} from '../../redux/actions/constants';

//Miscellaneous constants
const WIDTH_OFFSET_PX = 0
const HEIGHT_OFFSET_PX = 100

export const checkOffViewport = (state) => {
    const {
        viewport,
        cursorLocation,
        viewportRight,
        viewportBottom,
    } = state
    const newViewport = [...viewport]
    let updated = false
    if (cursorLocation[1] < viewport[1]) {
        newViewport[1] = cursorLocation[1]
        updated = true
    } else if (cursorLocation[1] > viewportRight) {
        newViewport[1] = cursorLocation[1]
        newViewport[1] = Math.min(getViewportLeft({ ...state, viewport: newViewport }), newViewport[1])
        updated = true
    }
    if (cursorLocation[0] < viewport[0]) {
        newViewport[0] = cursorLocation[0]
        updated = true
    } else if (cursorLocation[0] > viewportBottom) {
        newViewport[0] = cursorLocation[0]
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
    newState.viewportBottom = getViewportBottom(newState)
    newState.viewportRight = getViewportRight(newState)
    return newState

}

export const getViewportRight = (state) => {
    const {
        widths,
        viewport,
        totalCols,
    } = state
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
    return counter

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

export const getViewportBottom = (state) => {
    const {
        heights,
        viewport,
        totalRows,
    } = state
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
    return counter
}
