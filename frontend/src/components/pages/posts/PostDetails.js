import React, {useEffect, useState} from "react";
import '../../posts/style.scss'
import moment from "moment";
import {useParams} from "react-router";
import {fetchPost} from "../../../helpers/postHelper";
import NotFoundPage from "../NotFoundPage";

function PostDetails() {
    const [post, setPost] = useState(0);
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

    const image = post.image ? <img src={"/" + post.image}/> : '';

    const content = !post ? <NotFoundPage/> :
        <div className={'post'}>
            <h1 className={'title'}>
                {post.title}
            </h1>
            <div>
                {image}
            </div>
            <div className={'description'}>
                {post.description}
            </div>
            <div className={'created-at'}>
                Created: {moment(post.createdAt).format('YYYY-MM-DD')}
            </div>
            <div className={'content'}>
                {post.content}
            </div>
        </div>


    return (
        {content}
    )
}

export default PostDetails;