import React, {Component} from "react";
import './style.scss'
import PostListItem from "./PostListItem";
import Paginator from "./Paginator";
import {Link} from "react-router-dom";
import {postCreateRoute} from "../../constants/constants";
import {connect} from "react-redux";
import Alert from "../layout/alert/Alert";
import {fetchPostsList} from "../../helpers/postHelper";
import DeletePostModal from "./DeletePostModal";

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            totalPagesCount: 0,
            page: 1,
            showDeletePostModal: false,
            postToDeleteId: ""
        };

        this.handleSetPage = this.handleSetPage.bind(this);
        this.handleGetCurrentPage = this.handleGetCurrentPage.bind(this);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.showDeletePostModal = this.showDeletePostModal.bind(this);
        this.hideDeletePostModal = this.hideDeletePostModal.bind(this);

        this.createNewPostBtn = (props.isLoggedIn)
            ? <Link className={'btn btn-success'} to={postCreateRoute}>Create New Post</Link>
            : '';
    }

    showDeletePostModal(e) {
        this.setState({
            showDeletePostModal: true,
            postToDeleteId: e.target.attributes['data-id'].value
        });
    }

    hideDeletePostModal() {
        this.setState({showDeletePostModal: false});
    }

    handleSetPage(page) {
        this.setState({page: parseInt(page)});
    }

    handleGetCurrentPage() {
        return parseInt(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.fetchPosts();
        }
    }

    async fetchPosts() {
        let result = null;
        try {
            result = await fetchPostsList(this.state.page);
            if (result.items && result.totalPagesCount) {
                this.setState({
                    isLoaded: true,
                    items: result.items,
                    totalPagesCount: result.totalPagesCount
                });
            }
        } catch (err) {
            console.log(err);
            this.setState({
                isLoaded: false,
                error: err
            });
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    render() {
        const {error, isLoaded, items, totalPagesCount} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <Alert/>
                    <DeletePostModal
                        onPostDelete={this.fetchPosts}
                        postToDeleteId={this.state.postToDeleteId}
                        show={this.state.showDeletePostModal}
                        onHide={this.hideDeletePostModal}/>
                    {this.createNewPostBtn}
                    <ul className={'posts-list'}>
                        {items.map(item => (
                            <PostListItem key={item.url} item={item} showDeletePostModal={this.showDeletePostModal}/>
                        ))}
                    </ul>
                    <Paginator setPage={this.handleSetPage} getPage={this.handleGetCurrentPage}
                               totalPagesCount={totalPagesCount}/>
                </>

            );
        }
    }
}

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, null)(PostsList);