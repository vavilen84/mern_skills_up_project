import {getURL, USERS_BASE_URL} from "../helpers/Server";

export const SHOW_ALERT = 'SHOW_ALERT';

export function submitCreateUser(email, password){
    return (dispatch) => {
        return fetch(getURL(USERS_BASE_URL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
            .then(res =>  res.json())
            .then(json => dispatch(showAlert(json)))
        ;
    };
}

export function showAlert(payload) {
    return {
        type: SHOW_ALERT,
        showAlert: true,
        payload: payload
    };
}