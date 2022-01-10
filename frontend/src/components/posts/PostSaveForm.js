import React from "react";
import {POST_STATUS_ACTIVE} from "../../../../server/src/constants/constants";
import {defaultErr} from "../../constants/constants";
import {showAlertAction} from "../../actions";
import {connect} from "react-redux";

class PostSaveForm extends React.Component {

    constructor(props) {

        super(props);
console.log(props.endpointURL);
        this.state = {
            image: null,
            imageFileName: props.post?.image || "",
            url: props.post?.url || "",
            title: props.post?.title || "",
            content: props.post?.content || "",
            status: POST_STATUS_ACTIVE,
        };

        this.fileInput = React.createRef();

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeUrl(event) {
        this.setState({url: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let post = {
            title: this.state.title,
            url: this.state.url,
            content: this.state.content,
            image: this.fileInput.current.files[0] || null,
        };

        let formData = new FormData();
        formData.append('url', post.url);
        formData.append('image', post.image);
        formData.append('title', post.title);
        formData.append('content', post.content);

        await fetch(this.props.endpointURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken
            },
            body: formData
        })
            .then(res => res.json())
            .then(json => {
                if (json.code === 200) {
                    this.props.showAlert(null, null, this.props.successMessage);
                } else {
                    this.props.showAlert(json.code, json.data, json.message);
                }
                if (this.props.handleSuccess) {
                    this.props.handleSuccess(json.data);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.showAlert(500, null, defaultErr);
            });
    }

    render() {

        const image = !this.state.imageFileName
            ? ''
            : <div className={'image-preview'}>
                <img src={"/" + this.state.imageFileName}/> : '';
            </div>

        return (
            <div id={'save-post-form'}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Title</label>
                        <input type="text" className="form-control" placeholder="Title"
                               onChange={this.handleChangeTitle} value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">URL</label>
                        <input type="text" className="form-control" placeholder="URL ex: react-hooks"
                               onChange={this.handleChangeUrl} value={this.state.url}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Content</label>
                        <textarea className="form-control" placeholder="Content"
                                  onChange={this.handleChangeContent} value={this.state.content}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Image</label>
                        {image}
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

const mapDispatchToProps = dispatch => (
    {
        showAlert: (code, data, message) => dispatch(showAlertAction(code, data, message))
    }
)


const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        accessToken: auth.accessToken,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSaveForm);