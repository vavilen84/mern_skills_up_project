import {CHANGE_ROUTE, SHOW_ALERT, LOGIN, LOGOUT, SWITCH_MODE} from "../actionTypes";

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

export function changeRouteAction() {
    return {
        type: CHANGE_ROUTE
    };
}

export function switchModeAction(mode) {
    return {
        type: SWITCH_MODE,
        mode: mode
    };
}