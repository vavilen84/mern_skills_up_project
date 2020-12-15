import {getURL, USERS_BASE_URL} from "../../helpers";
import {showAlert, login} from "../index";
import {defaultErr, tokensEmptyErr} from "../../constants/constants";

export function authenticateUser(username, password) {
    return (dispatch) => {
        fetch(getURL(USERS_BASE_URL + "/" + username + "/authenticate"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())

            .then(json => {
                if (json.code === 200) {
                    const accessToken = json.data.accessToken;
                    const refreshToken = json.data.refreshToken;
                    if (!accessToken || !refreshToken) {
                        return Promise.reject(tokensEmptyErr);
                    }
                    dispatch(login(accessToken.token, refreshToken.token));
                }
                dispatch(showAlert(json.code, json.data, json.message));
            })
            .catch(err => {
                console.log(err);
                dispatch(showAlert(500, null, defaultErr));
            });
    };
}

