import React from 'react';

export default class NewPost extends React.Component {
    render() {
        return (   
            <div className="container">
                <div className="row main">
                        <div className="well well-sm">
                            <form className="form-horizontal" action="" method="post">
                                <fieldset>
                                    <legend className="text-center">Dodaj nowy post</legend>

 
                                    <div className="form-group">
                                    <label className="col-md-2 control-label" htmlFor="title">Temat</label>
                                        <div className="col-md-10">
                                            <input id="title" name="title" type="text" placeholder="Wprowadź nazwę tematu" className="form-control" />
                                                </div>
                                            </div>


                                    <div className="form-group">
                                        <label className="col-md-2 control-label" htmlFor="content">Treść</label>
                                        <div className="col-md-10">
                                            <textarea className="form-control" id="content" name="content" placeholder="Napisz czym chcesz się podzielić..." rows="10" />
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