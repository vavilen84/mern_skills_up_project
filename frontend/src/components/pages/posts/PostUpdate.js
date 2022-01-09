import React from "react";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";
import {fetchPost} from "../../../helpers/postHelper";

const PostUpdate = () => {

    // componentDidMount() {
    //     let post = null;
    //     try {
    //         post = await fetchPost(url);
    //         setPost(post);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <>
            <Alert/>
            <PostSaveForm successMessage={'Updated!'}/>
        </>
    );
}

export default PostUpdate;