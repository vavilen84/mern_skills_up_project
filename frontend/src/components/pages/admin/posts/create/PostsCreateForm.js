import React from "react";

class PostsCreateForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            url: '',
            content: ''
        };

        this.fileInput = React.createRef();

        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUrl(event) {
        this.setState({url: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let post = {
            url: this.state.url,
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
                        <label htmlFor="">URL</label>
                        <input required type="text" className="form-control" placeholder="URL ex: /react-hooks"
                               onChange={this.handleChangeUrl}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Content</label>
                        <textarea required className="form-control" placeholder="Content" onChange={this.handleChangeContent}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Image</label>
                        <input type="file" ref={this.fileInput} />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success"/>
                </form>
            </div>
        );
    }
}

export default PostsCreateForm;