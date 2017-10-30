import axios from 'axios';

//Action Types
const SET_INVESTMENTS = 'SET_INVESTMENTS';
const REMOVE_INVESTMENTS = 'REMOVE_INVESTMENTS';


//Action Creators

export function setInvestments(investments) {
    return {
        type: SET_INVESTMENTS,
        investments
    }
}

export function removeInvestments() {
    return {
        type: REMOVE_INVESTMENTS,
        investments: []
    }
}

//Thunk Creators

export function fetchInvestments(userId){
    return function thunk(dispatch){
        return axios.get(`/api/users/${userId}/investments`)
                .then(res => res.data)
                .then(investments => {
                    if (investments) dispatch(setInvestments(investments));
                })
                .catch(err => { throw err; })
    }
}

//Reducer
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_INVESTMENTS: return action.investments;
        case REMOVE_INVESTMENTS: return action.investments;
        default: return state;
    }
}
