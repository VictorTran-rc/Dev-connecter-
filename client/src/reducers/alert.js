// A function that takes in a piece of state and action 
import {
    SET_ALERT,
    REMOVE_ALERT
} from "../actions/types"

const initialState = []

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        // Add a new alert in the array in Devtools
        case SET_ALERT:
            return [...state, payload]
            //Remove alert by id
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}