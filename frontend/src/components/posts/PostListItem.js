import React, {Component} from "react";
import './style.scss'
import moment from "moment";
import {postsListRoute} from "../../constants/constants";
import {connect} from "react-redux";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";

class PostListItem extends Component {

    constructor(props) {
        super(props);
        this.postUpdateDeleteButtons = (props.isBackendMode && props.isLoggedIn)
            ? <PostUpdateDeleteButtons/>
            : "";
    }

    render() {
        return (
            <li>
                <div className={'title'}>
                    <a href={postsListRoute + "/" + this.props.item.url}>
                        {this.props.item.title}
                    </a>
                </div>
                <div className={'description'}>
                    Description: {this.props.item.description}
                </div>
                <div className={'created-at'}>
                    Created: {moment(this.props.item.createdAt).format('YYYY-MM-DD')}
                </div>
                {this.postUpdateDeleteButtons}
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, null)(PostListItem);