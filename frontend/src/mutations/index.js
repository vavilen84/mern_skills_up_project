export const defaultState = {
    type: null,
    showAlert: false,
    alert: {
        code: null,
        data: [],
        message: null,
        visible: false
    },
    auth: {
        accessToken: null,
        refreshToken: null
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

export function login(state, action) {
    state.auth = {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
    };

    return state;
}

export function logout(state) {
    state.auth = {
        accessToken: null,
        refreshToken: null
    };

    return state;
}