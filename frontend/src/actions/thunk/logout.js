import {logoutAction} from "../index";
import {accessToken, refreshToken} from "../../constants/constants";

export function logoutThunkAction() {
    return (dispatch) => {
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        dispatch(logoutAction())
    }
}