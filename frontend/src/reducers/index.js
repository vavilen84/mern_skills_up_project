import {SHOW_ALERT} from "../actions";

const defaultState = {
    showAlert: false,
    payload: null
};

export function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_ALERT:
            let st = Object.assign({},state);
            st.showAlert = true;
            st.payload = action.payload;
            return st;
        default:
            return state
    }
}