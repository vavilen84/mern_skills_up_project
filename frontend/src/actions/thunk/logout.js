import {accessToken, refreshToken} from "../../constants/constants";
import {logoutAction} from "../index";

export function logoutThunkAction() {
    return (dispatch) => {
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        dispatch(logoutAction())
    }
}