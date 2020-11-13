export const SHOW_ALERT = 'SHOW_ALERT';

export const INIT_APP = 'INIT_APP';

export function showAlert(payload) {
    return {
        type: SHOW_ALERT,
        showAlert: true,
        payload: payload
    };
}