import {loginAction} from "../index";
import {accessToken, refreshToken} from "../../constants/constants";

export function loginOnAppInitThunkAction() {
    return (dispatch) => {
        if (storageAvailable('localStorage')) {
            let accessTok = localStorage.getItem(accessToken);
            let refreshTok = localStorage.getItem(refreshToken);
            if (accessTok && refreshTok) {
                dispatch(loginAction(accessTok, refreshTok))
            }
        } else {
            console.log('localStorage is not available');
        }
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}