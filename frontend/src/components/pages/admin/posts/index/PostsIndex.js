import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";
import {adminPostsCreateRoute} from "../../../../../constants/constants";
import PostsList from "../../../../posts/PostsList";

const PostsIndex = () => {
    return (
        <div>
            <PostsList/>
            <Link className={'btn btn-success'} to={adminPostsCreateRoute}>Create</Link>
        </div>
    );
}

export default PostsIndex;