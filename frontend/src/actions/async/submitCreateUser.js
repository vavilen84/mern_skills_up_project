import {getURL, USERS_BASE_URL} from "../../helpers";
import {showAlert} from "../index";

export function submitCreateUser(email, password){
    return (dispatch) => {
        createUser(email, password)
            .then(res =>  res.json())
            .then(json => dispatch(showAlert(json.code, json.data, json.message)))
        ;
    };
}

function createUser(email, password){
    return fetch(getURL(USERS_BASE_URL), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    });
}