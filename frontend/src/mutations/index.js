import {frontendMode} from "../constants/constants";

export const defaultState = {
    type: null,
    showAlert: false,
    mode: frontendMode,
    alert: {
        code: null,
        data: [],
        message: null,
        visible: false
    },
    auth: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
};

export function showAlert(state, action) {
    state.showAlert = true;
    state.alert.visible = true;
    state.alert.code = action.code || null;
    state.alert.data = action.data || [];
    state.alert.message = action.message || null;

    return state;
}

export function clearAlert(state) {
    state.showAlert = false;
    state.alert.code = null;
    state.alert.visible = false;
    state.alert.data = [];
    state.alert.message = null;

    return state;
}

export function login(state, action) {

    localStorage.setItem('accessToken', action.accessToken);
    localStorage.setItem('refreshToken', action.refreshToken);

    state.auth = {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
    };

    return state;
}

export function logout(state) {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    state.auth = {
        accessToken: null,
        refreshToken: null
    };

    return state;
}

export function switchMode(state, action) {
    state.mode = action.mode;
    return state;
}