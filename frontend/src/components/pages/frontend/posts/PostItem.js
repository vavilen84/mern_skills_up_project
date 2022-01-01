import React, {Component} from "react";
import './style.scss'
import moment from "moment";

class PostItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li key={this.props.item.id}>
                <div className={'title'}>
                    {this.props.item.title}
                </div>
                <div className={'description'}>
                    {this.props.item.description}
                </div>
                <div className={'created-at'}>
                    Created: {moment(this.props.item.createdAt).format('YYYY-MM-DD')}
                </div>
            </li>
        )
    }
}

export default PostItem;