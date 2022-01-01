import {accessToken, refreshToken} from "../../constants/constants";
import {loginAction} from "../index";

export function loginOnAppInitThunkAction() {
    return (dispatch) => {
        let accessToken = localStorage.getItem(accessToken);
        let refreshToken = localStorage.getItem(refreshToken);
        if (accessToken && refreshToken) {
            dispatch(loginAction(accessToken, refreshToken))
        }
    }
}