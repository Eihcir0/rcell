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

import {
	offGrid,
	checkEdges,
	getViewportRight,
	getViewportBottom,
} from '../../magic/helpers/gridHelpers'
	
import {
	parseAndEvaluate,
} from '../../magic/helpers/formulaHelpers'

const checkOffViewport = (state) => {
    const {
        viewport,
        cursorLocation,
        viewportRight,
        viewportBottom,
    } = state
    const newViewport = [...viewport]
    let updated = false
    console.log(cursorLocation[1], viewportRight)
    if (cursorLocation[1] < viewport[1]) {
        newViewport[1] = cursorLocation[1]
        updated = true
    } else if (cursorLocation[1] > viewportRight) {
        newViewport[1] = cursorLocation[1]
        updated = true
    }
    
    if (cursorLocation[0] < viewport[0]) {
        newViewport[0] = cursorLocation[0]
        updated = true
    } else if (cursorLocation[0] > viewportBottom) {
        newViewport[0] = cursorLocation[0]
        updated = true
    }


    return updated && newViewport
}

export default function grid(state = initialState, action) {
    console.log('in reducer')
	let newState
	let viewport
	const viewportRow = state.viewport[0]
	const viewportCol = state.viewport[1]
	switch (action.type) {
        case SCROLL_UP:
            if (viewportRow === 0) return state
            viewport = [(viewportRow - 1), state.viewport[1]]
            newState = {
                ...state,
                viewport,
            }
            newState.viewportBottom = getViewportBottom(newState)
            newState.viewportRight = getViewportRight(newState)

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
            viewport = [state.viewport[0], (viewportCol - 1),]
            newState = {
                ...state,
                viewport,
            }
            return newState

        case SCROLL_RIGHT:
            console.log(state)
            if (viewportCol === (state.totalCols - 1)) return state
            viewport = [viewportRow, (viewportCol + 1),]
            newState = {
                ...state,
                viewport,
            }
            console.log(newState)
            return newState


		case SET_EDITING:
			newState = {
				...state,
				editingLocation: action.off ? false : [action.row, action.col],
				cellEditorStartingValue: action.value,
			}
			return newState
		
		case SET_CURSOR:
			if (offGrid(state, [action.row, action.col])) {
                return state}
            newState = {
                ...state,
                cursorLocation: [action.row, action.col],
            }
            let newViewport
            const offViewport = checkOffViewport(newState)
            const onEdge = checkEdges(state, newState.cursorLocation)
            if (offViewport) {
                newViewport = offViewport
            } else if (onEdge) {
                newViewport = onEdge // maybe better to fire action
            }

            if (newViewport) {
                newState.viewport = newViewport
            }
            newState.viewportBottom = getViewportBottom(newState)
            newState.viewportRight = getViewportRight(newState)
            return newState
		
		case SET_VALUE:
			newState = parseAndEvaluate({ action, state })
			// const widths = []
			// for (let i=0; i < 31; i++) {
			// 	widths.push(100)
			// }
			// widths[4] = 200

			// const heights = []
			// for (let i=0; i < 31; i++) {
			// 	heights.push(27)
			// }
			// heights[4] = 200
			// newState.heights = heights
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
			
		case REFRESH_VIEWPORT:
			newState = {
				...state,
				viewportBottom: getViewportBottom(state),
				viewportRight: getViewportRight(state),
			}
			return newState
			
		default:
			return state;
	}
}
