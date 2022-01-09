import {SHOW_ALERT, LOGIN, LOGOUT, HIDE_ALERT} from "../actionTypes";

export function showAlertAction(code, data, message) {
    return {
        type: SHOW_ALERT,
        code: code,
        data: data,
        message: message
    };
}

export function hideAlertAction() {
    return {
        type: HIDE_ALERT,
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