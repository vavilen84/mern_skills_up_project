export const USERS_BASE_URL = '/api/v1/users';

export const POSTS_BASE_URL = '/api/v1/posts';

// TODO
//export const SERVER_URL = 'http://server.react_node_blog_local:8000'
export const SERVER_URL = 'http://localhost:8000'

export const getServerAPIURL = (url) => (
    SERVER_URL + url
)

export const getFetchPostURL = (url) => {
    return getServerAPIURL(POSTS_BASE_URL + "/" + url);
}

export const getAuthURL = (username) => {
    return getServerAPIURL(USERS_BASE_URL + "/" + username + "/authenticate");
}

export const getPostsListURL = (page) => {
    return getServerAPIURL(POSTS_BASE_URL+"?page="+page);
}

export const getCreatePostURL = () => {
    return getServerAPIURL(POSTS_BASE_URL);
}

export const getUpdatePostURL = (id) => {
    return getServerAPIURL(POSTS_BASE_URL+"/"+id);
}