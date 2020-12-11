import {CHANGE_ROUTE, SHOW_ALERT, LOGIN} from "../actionTypes";
import {showAlert, clearAlert, defaultState, login} from "../mutations";

export function rootReducer(state = defaultState, action) {
    let st = Object.assign({},state);
    switch (action.type) {
        case SHOW_ALERT:
            return showAlert(st, action);
        case CHANGE_ROUTE:
            return clearAlert(st);
        case LOGIN:
            return login(st, action);
        default:
            return state
    }
}