import { 
    SET_CURSOR, 
    SET_EDITING,
    SET_VALUE,
    RESET_STARTING_EDITOR_VALUE,
    TOGGLE_SHIFT_GRID,

    REFRESH_VIEWPORT,
    SCROLL_DOWN,
    SCROLL_LEFT,
    SCROLL_RIGHT,
    SCROLL_UP,
} from './constants'

export const setCursor = (row, col) => {
    return { type: SET_CURSOR, row, col, }
}

export const setEditing = ({row, col, value, off}) => {
    return { type: SET_EDITING, row, col, value, off }
}

export const resetStartingEditorValue = () => {
    return { type: RESET_STARTING_EDITOR_VALUE, }
}

export const setValue = ({value, row, col}) => {
    return { type: SET_VALUE, row, col, value }
}

export const scrollUp = (value = 1) => {
    return { type: SCROLL_UP, value } // actually didnt do anything with this value in the reducer yet!
}
export const scrollDown = (value = 1) => {
    return { type: SCROLL_DOWN, value }
}
export const scrollLeft = (value = 1) => {
    return { type: SCROLL_LEFT, value }
}
export const scrollRight = (value = 1) => {
    console.log('here ok!!')
    return { type: SCROLL_RIGHT, value }
}

export const refreshViewportDimensions = () => {
    return { type: REFRESH_VIEWPORT }
}

export const toggleShiftGrid = () => {
    return { type: TOGGLE_SHIFT_GRID, }
}

// import * as constants from './constants';
// export function receiveStuff(data) {
//     return {}
//     // return {type: constants.RECEIVE_STUFF, stuff: data};
// }

// export function fetchStuff() {
//     return (dispatch) => {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response =>
//                 response.json().then(data => ({
//                     data: data,
//                     status: response.status
//                 }))
//             )
//             .then(response => {
//                 if(response.status === 200){
//                     dispatch(receiveStuff(response.data))
//                 }else{
//                     var flash = {
//                         type: 'error',
//                         title: 'Error getting task list',
//                         content: 'There was an error getting the task list. Please try again.'
//                     }
//                     dispatch({type: "DISPLAY_FLASH", data: flash})
//                 }
//             });
//     };
// }

