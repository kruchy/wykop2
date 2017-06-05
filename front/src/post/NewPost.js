import React, { PropTypes } from 'react';
import $ from 'jquery'
import Auth from '../login/Auth'

export default class NewPost extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            post: {
                title: '',
                content: ''
            },
            img: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);



    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };


    handleSubmit(event) {
        event.preventDefault();
        const title = encodeURIComponent(this.state.post.title);
        const content = encodeURIComponent(this.state.post.content);
        const img = encodeURIComponent(this.state.img);

        const formData = `title=${title}&content=${content}&image=${img}&token=${Auth.getToken()}`;

        $.ajax({
            url: "/posts",
            enctype: 'multipart/form-data',
            processData: false,
            type: "post",
            data: formData,
            success: function (response) {

                localStorage.setItem('successMessage', response.message);
                this.context.router.replace('/')

            }.bind(this)

        });

    }

    handleChange(event) {
        const field = event.target.name;
        const post = this.state.post;
        post[field] = event.target.value;
        this.setState({
            post
        });
    }


    handleImgChange(event) {
        let reader = new FileReader();
        const img = event.target.files[0];
        reader.onloadend = () => {
        this.setState({
            img: reader.result
        });
    }

    reader.readAsDataURL(img)

    }

    render() {
        return (   
            <div className="container">
                <div className="row main">
                        <div className="well well-sm">
                        <form className="form-horizontal" method="post" action="/posts" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <legend className="text-center">Dodaj nowy post</legend>

 
                                    <div className="form-group">
                                    <label className="col-md-2 control-label" htmlFor="title">Temat</label>
                                        <div className="col-md-10">
                                        <input id="title" name="title" type="text" placeholder="Wprowadź nazwę tematu" className="form-control" onChange={this.handleChange} value={this.state.post.title}/>
                                                </div>
                                </div>

                                    <div className="form-group">
                                        <label className="col-md-2 control-label" htmlFor="img">Obrazek</label>
                                        <div className="col-md-10">
                                        <input id="img" name="img" type="file" className="form-control" onChange={this.handleImgChange} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-md-2 control-label" htmlFor="content">Treść</label>
                                        <div className="col-md-10">
                                        <textarea className="form-control" id="content" name="content" placeholder="Napisz czym chcesz się podzielić..." rows="10" onChange={this.handleChange} value={this.state.post.content}/>
                                                </div>
                                            </div>

                                    <div className="form-group">
                                        <div className="col-md-12 text-right">
                                            <button type="submit" className="btn btn-primary btn-lg">Dodaj</button>
                                                </div>
                                            </div>
                                    </fieldset>
                         </form>
                    </div>

              </div>
           </div>

                    );
    }
};