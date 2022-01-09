import React, {useEffect, useState} from "react";
import '../../posts/style.scss'
import moment from "moment";
import {useParams} from "react-router";
import {getURL, POSTS_BASE_URL} from "../../../helpers";

function PostDetails() {
    const [post, setPost] = useState(0);
    const {url} = useParams();

    useEffect(() => {
        fetch(getURL(POSTS_BASE_URL+"/"+url))
            .then(res => res.json())
            .then(
                (res) => {
                    if (res.code === 200) {
                        setPost(res.data);
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }, []);

    const image = post.image ? <img src={"/"+post.image}/> : '';

    return (
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
    )
}

export default PostDetails;