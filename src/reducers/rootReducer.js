import {combineReducers} from 'redux';
import expression from './expressionReducer';

const rootReducer = combineReducers({
    expression
});

export default rootReducer;