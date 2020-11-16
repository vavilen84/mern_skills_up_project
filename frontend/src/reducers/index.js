import {CHANGE_ROUTE, SHOW_ALERT} from "../actionTypes";
import {showAlert, clearAlert, defaultState} from "../mutations";

export function rootReducer(state = defaultState, action) {
    let st = Object.assign({},state);
    switch (action.type) {
        case SHOW_ALERT:
            return showAlert(st, action);
        case CHANGE_ROUTE:
            return clearAlert(st);
        default:
            return state
    }
}