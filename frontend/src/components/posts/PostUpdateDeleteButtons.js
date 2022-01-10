import React from "react";
import './style.scss'
import {Link} from "react-router-dom";
import {getAdminUpdatePostURL} from "../../helpers/frontendURLHelper";
import {Button} from "react-bootstrap";

const PostUpdateDeleteButtons = function (props) {
    return (
        <div className={'update-delete-buttons'}>
            <Link className={'btn btn-success'} to={getAdminUpdatePostURL(props.item.url)}>Update</Link>
            <Button data-id={props.item._id} variant="danger" onClick={props.showDeletePostModal}>Delete</Button>
        </div>
    )
}

export default PostUpdateDeleteButtons;