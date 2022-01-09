import React from "react";
import {Navigate} from "react-router";
import {postsListRoute} from "../../../constants/constants";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";

class PostCreate extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            created: false
        };

        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess() {
        this.setState({created: true})
    }

    render() {
        const content = this.state.created
            ? <Navigate to={postsListRoute} replace={true}/>
            :
            <>
                <Alert/>
                <PostSaveForm handleSuccess={this.handleSuccess} successMessage={'Created!'} endpointURL={getPostCreateURL}/>
            </>

        return (content);
    }
}

export default PostCreate;