//Miscellaneous constants
const WIDTH_OFFSET_PX = 0
const HEIGHT_OFFSET_PX = 35


export const getViewportWidth = (state) => {
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

export const getViewportHeight = (state) => {
    const {
        heights,
        viewport,
        totalRows,
    } = state
    let height = heights[viewport[0]]
    let counter = viewport[0] + 1
    for (let idx = counter; idx < totalRows; idx++) {
        if ((height + heights[idx]) < window.outerHeight - HEIGHT_OFFSET_PX) {
            counter++
            height += Number(heights[idx])
        } else {
            break
        }
    }
    console.log('viewportHeight(rows):', counter + 1)
    return counter + 1

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

export const checkEdges = (state, newCursorLocation) => {
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
