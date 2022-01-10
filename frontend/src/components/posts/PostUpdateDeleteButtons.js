import React from "react";
import './style.scss'
import {Link} from "react-router-dom";
import {getAdminUpdatePostURL} from "../../helpers/frontendURLHelper";

const PostUpdateDeleteButtons = function (props) {
    return (
        <div className={'update-delete-buttons'}>
            <Link className={'btn btn-success'} to={getAdminUpdatePostURL(props.item.url)}>Update</Link>
            <a className={'btn btn-danger'}>Delete</a>
        </div>
    )
}

export default PostUpdateDeleteButtons;