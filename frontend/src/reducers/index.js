import {SHOW_ALERT,INIT_APP} from "../actions";

const defaultState = {
    showAlert: false,
    payload: null
};

export function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_ALERT:
            state.showAlert = true;
            state.payload = action.payload;
            return state;
        default:
            return state
    }
}