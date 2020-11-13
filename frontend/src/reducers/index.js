import {SHOW_ALERT,INIT_APP} from "../actions";

const defaultState = {
    type: INIT_APP,
    showAlert: false,
};

export default function(state = defaultState, action) {
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