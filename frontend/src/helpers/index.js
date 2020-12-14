export const USERS_BASE_URL = '/api/v1/users';

export const POSTS_BASE_URL = '/api/v1/posts';

// TODO
//export const SERVER_URL = 'http://server.react_node_blog_local:8000'
export const SERVER_URL = 'http://localhost:8000'

export const getURL = (url) => (
    SERVER_URL + url
)

export const getDefaultHeaders = () => {
    return {
        'Content-Type': 'application/json'
    }
}

export const getDefaultHeadersWithAuth = (accessToken) => {
    return Object.assign(
        getDefaultHeaders(),
        {'Authorization': 'Bearer ' + accessToken}
    );
}