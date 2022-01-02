import React, {Component} from "react";
import './style.scss'
import moment from "moment";
import {postsListRoute} from "../../../../constants/constants";

class PostListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.item);
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
            </li>
        )
    }
}

export default PostListItem;