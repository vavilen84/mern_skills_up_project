import React, {useEffect, useState} from "react";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";
import {fetchPost} from "../../../helpers/postHelper";
import {useNavigate, useParams} from "react-router";
import {getUpdatePostURL} from "../../../helpers/ApiUrlHelper";
import {getAdminUpdatePostURL} from "../../../helpers/frontendURLHelper";
import NotFoundPage from "../NotFoundPage";

const PostUpdate = () => {

    const [post, setPost] = useState(null);
    const {url} = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        let post = null;
        try {
            post = await fetchPost(url);
            setPost(post);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleSuccess = (post) => {
        navigate(getAdminUpdatePostURL(post.url));
    }

    return (
        !post
            ? <NotFoundPage/>
            :
            <>
                <h1>Update Post: {post.title}</h1>
                <Alert/>
                <PostSaveForm
                    post={post}
                    successMessage={'Updated!'}
                    handleSuccess={handleSuccess}
                    endpointURL={getUpdatePostURL(post._id)}/>
            </>
    );
}

export default PostUpdate;