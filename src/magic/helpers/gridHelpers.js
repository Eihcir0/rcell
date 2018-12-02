//Miscellaneous constants
const WIDTH_OFFSET_PX = 0
const HEIGHT_OFFSET_PX = 100


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


export const offGrid = (state, proposedLocation) => {
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
            return newCursorLocation[1] === state.viewport[1] - 1

        case 'right':
            return newCursorLocation[1] === state.viewportRight - 1

        case 'top':
            return newCursorLocation[0] === state.viewport[0] - 1

        case 'bottom':
            return newCursorLocation[0] === state.viewportBottom - 1

        default:
            return false
    }
}

export const checkEdges = (state, newCursorLocation) => {
    const newViewport = [...state.viewport]
    if (checkEdge('left', state, newCursorLocation)) {
        newViewport[1] -= 1
    }
    if (checkEdge('right', state, newCursorLocation)) {
        if (state.cursorLocation[1] < newCursorLocation[1]) {
            newViewport[1] += 1
        }
    }
    if (checkEdge('top', state, newCursorLocation)) {
        newViewport[0] -= 1
    }
    if (checkEdge('bottom', state, newCursorLocation)) {
        if (state.cursorLocation[0] < newCursorLocation[0]) {
            newViewport[0] += 1
        }
    }
    return newViewport


}
