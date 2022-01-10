import React from "react";
import {Button, Modal} from "react-bootstrap";
import {deletePost} from "../../helpers/postHelper";
import {connect} from "react-redux";

const DeletePostModal = (props) => {

    const handleDeletePost = async () => {
        try {
            await deletePost(props.postToDeleteId, props.accessToken)
        } catch(err){
            console.log(err);
        }
        props.onPostDelete();
        props.onHide();
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want ot remove the post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        accessToken: auth.accessToken,
    };
}

export default connect(mapStateToProps, null)(DeletePostModal);