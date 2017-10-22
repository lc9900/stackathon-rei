import {combineReducers} from 'redux';
import cart from './cart';

// Simple reducer for display on main
const DISPLAY_MAIN = 'DISPLAY_MAIN'; //  To render the main component

export function displayMain(){
    return {
        type: DISPLAY_MAIN
    }
}

const displayReducer = (state=false, action) => {
    switch(action) {
        case DISPLAY_MAIN: return true;
        default: return state;
    }
}


export default combineReducers({
	// cart,
    display: displayReducer, // global state is named display
})

// export * from './cart'

