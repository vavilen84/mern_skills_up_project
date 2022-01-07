import React, {Component} from "react";
import './style.scss'
import {postCreateRoute} from "../../constants/constants";
import {Link} from "react-router-dom";

const PostUpdateDeleteButtons = function () {
    return (
        <div className={'update-delete-buttons'}>
            <Link className={'btn btn-success'} to={postCreateRoute}>Update</Link>
            <a className={'btn btn-danger'}>Delete</a>
        </div>
    )
}

export default PostUpdateDeleteButtons;