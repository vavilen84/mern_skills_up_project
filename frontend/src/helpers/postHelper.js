import {getFetchPostURL, getPostsListURL} from "./ApiUrlHelper";

export const fetchPost = async (url) => {
    let post = null;
    let resp = null;
    let json = null;
    try {
        resp = await fetch(getFetchPostURL(url));
        json = await resp.json();
        if (json && json.code === 200) {
            post = json.data;
        }
    } catch (err) {
        console.log(err);
    }
    return post;
}

export const fetchPostsList = async (page) => {
    fetch(getPostsListURL(page))
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    isLoaded: true,
                    items: res.data.items,
                    totalPagesCount: res.data.total_pages_count
                });
            },
            // Note: it is important to handle errors here, and not in the catch () block,
            // so as not to catch the exception from errors in the component itself.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
}