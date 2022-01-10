import {getDeletePostURL, getFetchPostURL, getPostsListURL} from "./ApiUrlHelper";
import {fetchOptions} from "./apiHelper";
import {defaultErr} from "../constants/constants";

export const fetchPost = async (url) => {
    let post = null;
    let resp = null;
    let json = null;
    try {
        resp = await fetch(getFetchPostURL(url), fetchOptions);
        json = await resp.json();
        console.log(json);
        if (json && json.code === 200) {
            post = json.data;
        }
    } catch (err) {
        console.log(err);
    }
    return post;
}

export const fetchPostsList = async (page) => {
    let result = {
        list: null,
        totalPagesCount: null
    };
    let resp = null;
    let json = null;
    try {
        resp = await fetch(getPostsListURL(page), fetchOptions);
        json = await resp.json();
        if (json && json.code === 200) {
            result.items = json.data.items;
            result.totalPagesCount = json.data.total_pages_count;
        }
    } catch (err) {
        console.log(err);
    }
    return result;
}

export const deletePost = async (id, accessToken) => {
    await fetch(getDeletePostURL(id), {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).catch(err => {
        console.log(err);
    });
}