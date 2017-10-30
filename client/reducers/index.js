import {combineReducers} from 'redux';
import user from './user';
import properties from './properties';
import transactions from './transactions';
import investments from './investments';

// Simple reducer for display on main
const DISPLAY_MAIN = 'DISPLAY_MAIN'; //  To render the main component

export function displayMain(flag){
    return {
        type: DISPLAY_MAIN,
        flag // flag is a boolean
    }
}

const display = (state=false, action) => {
    switch(action.type) {
        case DISPLAY_MAIN:
            return action.flag;
        default: return state;
    }
}


export default combineReducers({
    display, // global state is named display
    user, properties, transactions, investments
});

export * from './user';
export * from './properties';
export * from './transactions';
export * from './investments';

