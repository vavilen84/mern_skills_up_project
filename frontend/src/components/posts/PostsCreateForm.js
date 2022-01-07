import React from "react";
import {POST_STATUS_ACTIVE} from "../../../../server/src/constants/constants";

class PostsCreateForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            image: "",
            uniqueKey: "",
            url: "",
            title: "",
            relatedPostIds: [], // TODO
            tags: [], // TODO
            keywords: "", // TODO
            description: "", // TODO
            greeting: "", // TODO
            content: "",
            status: POST_STATUS_ACTIVE,
            created: null,
            updated: null
        };

        this.fileInput = React.createRef();

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeUniqueKey = this.handleChangeUniqueKey.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeUrl(event) {
        this.setState({url: event.target.value});
    }

    handleChangeUniqueKey(event) {
        this.setState({uniqueKey: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let post = {
            title: this.state.title,
            url: this.state.url,
            uniqueKey: this.state.uniqueKey,
            content: this.state.content,
            image: this.fileInput.current.files[0] || null,
        };
        this.props.handleSubmit(post);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Title</label>
                        <input required type="text" className="form-control" placeholder="Title"
                               onChange={this.handleChangeTitle}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">URL</label>
                        <input required type="text" className="form-control" placeholder="URL ex: react-hooks"
                               onChange={this.handleChangeUrl}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Unique Key</label>
                        <input required type="text" className="form-control" placeholder="react_hooks"
                               onChange={this.handleChangeUniqueKey}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Content</label>
                        <textarea required className="form-control" placeholder="Content" onChange={this.handleChangeContent}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Image</label>
                        <div>
                            <input type="file" ref={this.fileInput} />
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success"/>
                </form>
            </div>
        );
    }
}

export default PostsCreateForm;