import {postRoute, postUpdateRoute} from "../constants/constants";

export const getUpdatePostURL = (url) => {
    return postUpdateRoute.replace(':url', url)
}

export const getPostDetailsURL = (url) => {
    return postRoute.replace(':url', url);
}