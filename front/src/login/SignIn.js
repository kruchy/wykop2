import React from 'react';
import { Link } from 'react-router';

export default class SignIn extends React.Component {
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
                        <form className="form-horizontal" method="post" action="#">
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label">Użytkownik</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" name="username" id="username" placeholder="Wpisz nazwę użytkownika" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label">Hasło</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Wpisz hasło" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button">Zaloguj się</button>
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