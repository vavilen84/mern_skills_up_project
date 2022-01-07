import React, {Component} from "react";
import './style.scss'

const PostUpdateDeleteButtons = function () {
    return (
        <div className={'update-delete-buttons'}>
            <a className={'btn btn-success'}>Update</a>
            <a className={'btn btn-danger'}>Delete</a>
        </div>
    )
}

export default PostUpdateDeleteButtons;