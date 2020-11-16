import {SHOW_ALERT} from "../actions";

const defaultState = {
    showAlert: false,
    payload: null
};

export function rootReducer(state, action) {
    if (!state) {
        state = defaultState;
    }
    switch (action.type) {
        case SHOW_ALERT:
            return [
                ...state,
                {
                    showAlert: true,
                    payload: action.payload
                }
            ]
        default:
            return state
    }
}