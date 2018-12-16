import initialState from './initialState';
import { 
	SET_CURSOR,
	SET_EDITING,
	SET_VALUE,
	RESET_STARTING_EDITOR_VALUE,
	TOGGLE_SHIFT_GRID,
    JUMP,
	SCROLL,
    REFRESH_VIEWPORT,
} from '../actions/constants';

import {
	offGrid,
    checkEdges,
} from '../../magic/helpers/gridHelpers'
	
import {
    jump,
} from '../../magic/helpers/jump'
	
import {
    checkOffViewport,
	getViewportRight,
    getViewportBottom,
    scroll,
} from '../../magic/helpers/viewportHelpers'
	
import {
    parseAndEvaluate,
    getCellValueObject,
} from '../../magic/helpers/formulaHelpers'


export default function grid(state = initialState, action) {
	let newState
    let newViewport
    let onEdge
    let offViewport

	switch (action.type) {
        case SCROLL:
            return scroll(action, state)


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
            offViewport = checkOffViewport(newState)
            onEdge = checkEdges(state, newState.cursorLocation)
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
		
        case JUMP:
            const cursorLocation = jump(action.direction, state)
            newState = {
                ...state,
                cursorLocation,
            }
            offViewport = checkOffViewport(newState)
            if (offViewport) {
                newViewport = offViewport
            } else {
                onEdge = checkEdges(state, newState.cursorLocation)
                if (onEdge) {
                    newViewport = onEdge // maybe better to fire action
                }
            }
            if (newViewport) {
                newState.viewport = newViewport
                newState.viewportBottom = getViewportBottom(newState)
                newState.viewportRight = getViewportRight(newState)
            }
            return newState
		
        case SET_VALUE:
            newState = {
                ...state,
                values: {
                    ...state.values,
                    [action.row]: {
                        ...state.values[action.row],
                        [action.col]: {
                            ...state.values[action.row][action.col],
                            ...getCellValueObject({ grid: state.values, action })
                        }
                    }
                }
            }
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
