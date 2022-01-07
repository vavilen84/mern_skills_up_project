import {SHOW_ALERT, LOGIN, LOGOUT} from "../actionTypes";
import {showAlert, defaultState, login, logout} from "../mutations";

export function rootReducer(state = defaultState, action) {
    let st = Object.assign({},state);
    switch (action.type) {
        case SHOW_ALERT:
            return showAlert(st, action);
        case LOGIN:
            return login(st, action);
        case LOGOUT:
            return logout(st);
        default:
            return state
    }
}