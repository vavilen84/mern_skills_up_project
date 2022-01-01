import React, {Component} from "react";
import './style.scss'
import {getURL, POSTS_BASE_URL} from "../../../../helpers";
import PostItem from "./PostItem";

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch(getURL(POSTS_BASE_URL))
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res);
                    this.setState({
                        isLoaded: true,
                        items: res.data
                    });
                },
                // Note: it is important to handle errors here, and not in the catch () block,
                // so as not to catch the exception from errors in the component itself.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul className={'posts-list'}>
                    {items.map(item => (
                        <PostItem key={item.uniqueKey} item={item}/>
                    ))}
                </ul>
            );
        }
    }
}

export default PostsList;