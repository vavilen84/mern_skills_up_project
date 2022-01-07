import {SHOW_ALERT, LOGIN, LOGOUT} from "../actionTypes";

export function showAlertAction(code, data, message) {
    return {
        type: SHOW_ALERT,
        code: code,
        data: data,
        message: message
    };
}

export function loginAction(accessToken, refreshToken) {
    return {
        type: LOGIN,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

export function logoutAction() {
    return {
        type: LOGOUT,
    };
}