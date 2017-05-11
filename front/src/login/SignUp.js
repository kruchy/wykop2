import React from 'react';
import { Link } from 'react-router';


export default class SignUp extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            user: {
                username: '',
                password: '',
                email: ''

            }
        };
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }


    processForm(event) {
        event.preventDefault();
        const username = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${username}&password=${password}&email=${email}`;

        const request = new XMLHttpRequest();
        request.open('post', '/register');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.responseType = 'json';
        request.addEventListener('load', () => {
            if (request.status === 200) {

                this.setState({
                    errors: {}
                });

                localStorage.setItem('successMessage', request.response.message);
                this.context.router.replace('/signin');
            } else {

                const errors = request.response.errors ? request.response.errors : {};
                errors.summary = request.response.message;

                this.setState({
                    errors
                });
            }
        });
        request.send(formData);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        console.log(user);
        this.setState({
            user
        });
    }


    render() {
        return (

            <div className="container">
                <div className="row main">
                    <div className="panel-heading">
                        <div className="panel-title text-center">
                            <h1 className="title">Rejestracja</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="main-login main-center">
                        <form className="form-horizontal" method="post" action="/register" onSubmit={this.onSubmit} >
                            <div className="form-group">
                                <label htmlFor="username" className="cols-sm-2 control-label">Użytkownik</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" name="username" id="username" placeholder="Wpisz nazwę użytkownika" onChange={this.changeUser} value={this.state.user.username} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="cols-sm-2 control-label">Email</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Wpisz adres email" onChange={this.changeUser} value={this.state.user.email} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="cols-sm-2 control-label">Hasło</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Wpisz hasło" onChange={this.changeUser} value={this.state.user.password} />
                                    </div>
                                </div>
                            </div>


                            <div className="form-group ">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Zarejestruj się</button>
                            </div>
                            <div className="login-register">
                                <Link to={"signin"}>
                                    Zaloguj
                                 </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
};

SignUp.contextTypes = {
    router: React.PropTypes.object.isRequired
};