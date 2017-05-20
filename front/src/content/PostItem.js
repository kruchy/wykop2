
import React from 'react';
import { Link } from 'react-router';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.id = "";
        this.state = {
            id: this.props.id
        };
    }

    link(props) {
     return   <Link to={`/post/${this.props.data.id}`}>
               {props}
        </Link>
}


    render() {
        //const thisDate = new Date(this.props.date);
        return (
            <div className="box1">
                <h3>
                    {this.link(this.props.data.title)}
                </h3> 

                <span>By {this.props.data.author} < span className="comments">8 Comments</span></span>

                <span className="vote">
                    <i className="glyphicon glyphicon-chevron-up" ></i>
                    <span className="label label-primary">10</span>
                    <i className="glyphicon glyphicon-chevron-down" ></i>
                </span>   
                <div className="view">

                    {this.link(<img alt="post_image" src={require(`../../img/${this.props.data.img}` )} />)} 
				</div>
                    <div className="data">
                        <p>{this.props.data.summary}</p>
                        <span>
                               {this.link("Continue reading >>>")} 
                        </span>
                    </div>
                    <div className="clear"></div>
                </div>


        );
    }
};
