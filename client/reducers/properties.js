import axios from 'axios'

//Action Types
const SET_PROPERTIES = 'SET_PROPERTIES';
const REMOVE_PROPERTIES = 'REMOVE_PROPERTIES';


//Action Creators

export function setProperties(properties) {
    return {
        type: SET_PROPERTIES,
        properties
    }
}

export function removeProperties() {
    return {
        type: REMOVE_PROPERTIES,
        properties: []
    }
}

//Thunk Creators

export function fetchProperties(userId){
    return function thunk(dispatch){
        return axios.get(`/api/users/${userId}/properties`)
                .then(res => res.data)
                .then(properties => {
                    if (properties) dispatch(setProperties(properties));
                })
                .catch(err => { throw err; })
    }
}

//Reducer
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_PROPERTIES: return action.properties;
        case REMOVE_PROPERTIES: return action.properties;
        default: return state;
    }
}
