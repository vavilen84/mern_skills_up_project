import {getURL, USERS_BASE_URL} from "../../helpers";
import {loginAction, showAlertAction} from "../index";
import {accessToken, defaultErr, refreshToken, tokensEmptyErr} from "../../constants/constants";

export function authenticateUserThunkAction(username, password) {
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
                    const accessTokenData = json.data.accessToken;
                    const refreshTokenData = json.data.refreshToken;
                    if (!accessTokenData || !refreshTokenData) {
                        return Promise.reject(tokensEmptyErr);
                    }
                    localStorage.setItem(accessToken, accessTokenData.token);
                    localStorage.setItem(refreshToken, refreshTokenData.token);
                    dispatch(loginAction(accessTokenData.token, refreshTokenData.token));
                }
                dispatch(showAlertAction(json.code, json.data, json.message));
            })
            .catch(err => {
                console.log(err);
                dispatch(showAlertAction(500, null, defaultErr));
            });
    };
}

