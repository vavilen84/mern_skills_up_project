import {CHANGE_ROUTE, SHOW_ALERT} from "../actionTypes";

export function showAlert(code, data, message) {
    return {
        type: SHOW_ALERT,
        code: code,
        data: data,
        message: message
    };
}

export function changeRoute(){
    return {
        type: CHANGE_ROUTE
    };
}