import {getURL, USERS_BASE_URL} from "../../helpers/Server";
import {showAlert} from "../index";

export function submitCreateUser(email, password){
    return (dispatch) => {
        fetch(getURL(USERS_BASE_URL), {
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
            .then(json => dispatch(showAlert(json.code, json.data, json.message)))
        ;
    };
}