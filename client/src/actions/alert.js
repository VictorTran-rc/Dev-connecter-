import {
    v4 as uuidv4
} from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuidv4();;
    dispatch({
        //when this is called it will display all of the parameters send to the alerts reducer
        type: SET_ALERT,
        payload: {
            msg,
            alertType,
            id,
        },
    });
    // Removing the alert action from the component after 5 seconds of showing up 
    setTimeout(() => dispatch({
            type: REMOVE_ALERT,
            payload: id
        }),
        timeout);
};