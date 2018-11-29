import {combineReducers} from 'redux';
import grid from './gridReducer';

const rootReducer = combineReducers({
    grid
});

export default rootReducer;