import axios from 'axios';

//Action Types
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const REMOVE_TRANSACTIONS = 'REMOVE_TRANSACTIONS';


//Action Creators

export function setTransactions(transactions) {
    return {
        type: SET_TRANSACTIONS,
        transactions
    }
}

export function removeTransactions() {
    return {
        type: REMOVE_TRANSACTIONS,
        transactions: []
    }
}

//Thunk Creators

export function fetchTransactions(userId){
    return function thunk(dispatch){
        return axios.get(`/api/users/${userId}/transactions`)
                .then(res => res.data)
                .then(transactions => {
                    if (transactions) dispatch(setTransactions(transactions));
                })
                .catch(err => { throw err; })
    }
}

//Reducer
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_TRANSACTIONS: return action.transactions;
        case REMOVE_TRANSACTIONS: return action.transactions;
        default: return state;
    }
}
