import initialState from './initialState';
import { SET_CURSOR } from '../actions/constants';

export default function grid(state = initialState, action) {
  let newState;
  switch (action.type) {
    // case FETCH_STUFF:
    //   console.log('FETCH_STUFF Action')
    //   return action;
    // case RECEIVE_STUFF:
    //   newState = action.stuff;
    //   console.log('RECEIVE_STUFF Action')
    //   return newState;

    case SET_CURSOR:
      newState = {
        ...state,
        cursorLocation: action.location,
      }
      // console.log(newState.cursorLocation);
      // console.log(new Date())
      
      return newState
    default:
      return state;
  }
}