import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";
import {adminPostsCreateRoute} from "../../../../../constants/constants";

const PostsIndex = (props) => {
    return (
        <div>
            <Link className={'btn btn-success'} to={adminPostsCreateRoute}>Create</Link>
        </div>
    );
}

export default PostsIndex;