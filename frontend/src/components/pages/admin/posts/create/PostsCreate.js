import React from "react";
import {connect} from 'react-redux'
import {Redirect} from "react-router";
import {adminPostsIndexRoute, defaultErr} from "../../../../../constants/constants";
import PostsCreateForm from "./PostsCreateForm";
import {getURL, POSTS_BASE_URL} from "../../../../../helpers";
import {showAlert} from "../../../../../actions";

class PostsCreate extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            created: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(post) {

        let formData = new FormData();
        formData.append('url', post.url);
        formData.append('image', post.image);
        formData.append('content', post.content);

        await fetch(getURL(POSTS_BASE_URL), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken
            },
            body: formData
        })
            .then(res => res.json())
            .then(json => {
                if (json.code === 200) {
                    this.setState({created: true});
                }
                this.props.showAlert(json.code, json.data, json.message);
            })
            .catch(err => {
                console.log(err);
                this.props.showAlert(500, null, defaultErr);
            });
    }

    render() {

        const content = this.state.created
            ? <Redirect to={adminPostsIndexRoute}/>
            : <PostsCreateForm handleSubmit={this.handleSubmit}/>

        return (content);
    }
}

const mapDispatchToProps = dispatch => (
    {
        showAlert: (code, data, message) => dispatch(showAlert(code, data, message))
    }
)


const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        accessToken: auth.accessToken,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsCreate);