export const defaultState = {
    type: null,
    showAlert: false,
    alert: {
        code: null,
        data: [],
        message: null,
        visible: false
    }
};

export function showAlert(state, action){
    state.showAlert = true;
    state.alert.visible = true;
    state.alert.code = action.code || null;
    state.alert.data = action.data || [];
    state.alert.message = action.message || null;
    return state;
}

export function clearAlert(state){
    state.showAlert = false;
    state.alert.code = null;
    state.alert.visible = false;
    state.alert.data = [];
    state.alert.message = null;
    return state;
}