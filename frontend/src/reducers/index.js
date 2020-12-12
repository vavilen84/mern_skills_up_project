import {CHANGE_ROUTE, SHOW_ALERT, LOGIN, LOGOUT, SWITCH_MODE} from "../actionTypes";
import {showAlert, clearAlert, defaultState, login, logout, switchMode} from "../mutations";

export function rootReducer(state = defaultState, action) {
    let st = Object.assign({},state);
    switch (action.type) {
        case SHOW_ALERT:
            return showAlert(st, action);
        case CHANGE_ROUTE:
            return clearAlert(st);
        case LOGIN:
            return login(st, action);
        case LOGOUT:
            return logout(st);
        case SWITCH_MODE:
            return switchMode(st, action);
        default:
            return state
    }
}