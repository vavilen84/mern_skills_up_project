import {SHOW_ALERT} from "../actions";

const defaultState = {
    type: null,
    showAlert: false,
    alert: {
        code: null,
        data: [],
        message: null
    }
};

export function rootReducer(state, action) {
    if (!state) {
        state = defaultState;
    }
    switch (action.type) {
        case SHOW_ALERT:
            let st = Object.assign({},state);
            st.showAlert = action.showAlert;
            st.alert = action.alert;
            return st;
        default:
            return state
    }
}