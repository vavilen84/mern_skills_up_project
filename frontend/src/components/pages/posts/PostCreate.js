import React from "react";
import {Navigate} from "react-router";
import {postsListRoute} from "../../../constants/constants";
import PostSaveForm from "../../posts/PostSaveForm";
import Alert from "../../layout/alert/Alert";
import {getCreatePostURL} from "../../../helpers/ApiUrlHelper";

class PostCreate extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            created: false
        };

        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess(post) {
        this.setState({created: true})
    }

    render() {
        const content = this.state.created
            ? <Navigate to={postsListRoute} replace={true}/>
            :
            <>
                <h1>Create New Post</h1>
                <Alert/>
                <PostSaveForm handleSuccess={this.handleSuccess} successMessage={'Created!'} endpointURL={getCreatePostURL()}/>
            </>

        return (content);
    }
}

export default PostCreate;