import {CHANGE_ROUTE, SHOW_ALERT, LOGIN} from "../actionTypes";

export function showAlert(code, data, message) {
    return {
        type: SHOW_ALERT,
        code: code,
        data: data,
        message: message
    };
}

export function login(accessToken, refreshToken) {
    return {
        type: LOGIN,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

export function changeRoute(){
    return {
        type: CHANGE_ROUTE
    };
}