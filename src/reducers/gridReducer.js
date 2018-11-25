import initialState from './initialState';
import { 
  SET_CURSOR,
  SET_EDITING,
  SET_VALUE,
  RESET_STARTING_VALUE,
} from '../actions/constants';

export default function grid(state = initialState, action) {
  console.log('here at beginning of grid-reducer')
  console.log(action)
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
      const newValues = [...state.values]
      newValues[action.row][action.col] = action.value
      newState = {
        ...state,
        values: newValues,
      }
      return newState
      
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
    //   console.log('FETCH_STUFF Action')
    //   return action;
    // case RECEIVE_STUFF:
    //   newState = action.stuff;
    //   console.log('RECEIVE_STUFF Action')
    //   return newState;
