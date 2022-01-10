import {postRoute, postAdminUpdateRoute} from "../constants/constants";

export const getAdminUpdatePostURL = (url) => {
    return postAdminUpdateRoute.replace(':url', url)
}

export const getPostDetailsURL = (url) => {
    return postRoute.replace(':url', url);
}