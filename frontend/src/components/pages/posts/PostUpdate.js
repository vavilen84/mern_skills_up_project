import React, {useEffect, useState} from "react";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";
import {fetchPost} from "../../../helpers/postHelper";
import {useParams} from "react-router";
import {getUpdatePostURL} from "../../../helpers/ApiUrlHelper";

const PostUpdate = () => {

    const [post, setPost] = useState(null);
    const {url} = useParams();

    useEffect(async () => {
        let post = null;
        try {
            post = await fetchPost(url);
            setPost(post);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        !post
            ? ''
            :
            <>
                <h1>Update Post: {post.title}</h1>
                <Alert/>
                <PostSaveForm
                    post={post}
                    successMessage={'Updated!'}
                    endpointURL={getUpdatePostURL(post.id)}/>
            </>
    );
}

export default PostUpdate;