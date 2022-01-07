import React from "react";
import PostsList from "../../../posts/PostsList";
import {Link} from "react-router-dom";
import {postCreateRoute} from "../../../../constants/constants";

const PostsIndex = function (){
    return (
        <>
            <PostsList/>
            <Link className={'btn btn-success'} to={postCreateRoute}>Create</Link>
        </>
    )
}

export default PostsIndex;