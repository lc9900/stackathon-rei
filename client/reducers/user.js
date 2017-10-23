import axios from 'axios'

//Action Types
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';


//Action Creators

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}

export function removeUser() {
    return {
        type: SET_USER,
        user: {}
    };
}

//Thunk Creators

export function verifyUser(credential){
    return function thunk (dispatch) {
        return axios.post('/api/auth', credential)
            .then(res => res.data)
            .then(user => {
                if (user) {
                    dispatch(setUser(user));
                }
            })
            .catch(err => {
                throw err;
            });
    };
}

export function fetchUser(){
    return function thunk(dispatch){
        return axios.get('/api/auth/me')
                .then(res => res.data)
                .then(user => {
                    if (user) dispatch(setUser(user));
                })
    }
}

export function logout(){
    return function thunk(dispatch){
        return axios.post('/api/auth/logout')
                    .then(() => {
                        dispatch(removeUser());
                    })
                    .catch( err => { throw err; });
    }
}

//Reducer
export default function reducer(state = {}, action) {
    switch(action.type) {
        case SET_USER: return action.user;
        case REMOVE_USER: return action.user;
        default: return state;
    }
}
