import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery'
import Auth from './Auth'

export default class SignIn extends React.Component {

        constructor(props, context) {
                super(props, context);
        
                const storedMessage = localStorage.getItem('successMessage');
                let successMessage = '';
        
                    if (storedMessage) {
                            successMessage = storedMessage;
                            localStorage.removeItem('successMessage');
                        }
        
                    this.state = {
                        errors: { },
                        successMessage,
                            user: {
                                username: '',
                                password: ''
                                    }
                    };
        
                this.processForm = this.processForm.bind(this);
                this.handleChange = this.handleChange.bind(this);
            }
 
        static contextTypes = {
         router: PropTypes.object.isRequired
        };

        processForm(event) {
            event.preventDefault();
    
            const username = encodeURIComponent(this.state.user.username);
            const password = encodeURIComponent(this.state.user.password);
            const formData = `username=${username}&password=${password}`;
    
                $.ajax({
                        url: "/login",
                        type: "post",
                        data: formData,
                        beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                            },
                        success: function (response) {
                            this.setState({
                                 errors: {}
                            });
    
                            Auth.authenticateUser(response.token);
                            this.context.router.replace('/');
    
                    }.bind(this),
            
                       error: function (response) {
                             const errors = response.errors ? response.errors : {};
                             errors.summary = response.message;
                
                             this.setState({
                                  errors
                             });
            }.bind(this)
    
            });

        }

        handleChange(event) {
            const field = event.target.name;
            const user = this.state.user;
            user[field] = event.target.value;
    
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
                            <h1 className="title">Logowanie</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="main-login main-center">
                        <form className="form-horizontal" method="post" action="/" onSubmit={this.processForm}>
                            <div className="form-group">
                                <label htmlFor="username" className="cols-sm-2 control-label">Użytkownik</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" name="username" id="username" onChange={this.handleChange} value={this.state.user.username} placeholder="Wpisz nazwę użytkownika" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="cols-sm-2 control-label">Hasło</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control" name="password" id="password" onChange={this.handleChange} value={this.state.user.password} placeholder="Wpisz hasło" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Zaloguj się</button>
                            </div>
                            <div className="login-register">
                                <Link to={"signup"}>
                                    Stwórz konto
                              </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
};