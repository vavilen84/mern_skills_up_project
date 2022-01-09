import React from "react";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";

class PostUpdate extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Alert/>
                <PostSaveForm successMessage={'Updated!'} />
            </>
        );
    }
}

export default PostUpdate;