import React from "react";
import {Button, Modal} from "react-bootstrap";

const DeletePostModal = (props) => {
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
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletePostModal;