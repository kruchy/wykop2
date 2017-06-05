
import React from 'react';
import { Link } from 'react-router';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.id = "";
        this.state = {
            id: this.props.data._id
        };
    }

    convert(image) {
        console.log(image);
        return image;
        
    }

    link(props) {
     return   <Link to={`/post/${this.state.id}`}>
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
                <span>By {this.props.data.author.username} < span className="comments">{this.props.data.comments.length} Comments</span></span>

                <span className="vote">
                    <i className="glyphicon glyphicon-chevron-up" ></i>
                    <span className="label label-primary">10</span>
                    <i className="glyphicon glyphicon-chevron-down" ></i>
                </span>  
                {this.props.data.image ?
                    <div className="view">
                        {this.link(<img className="postimg" alt="post_image" src={`${this.props.data.image}`} />)}
                    </div>
                    : 
                    <div className="view">
                        <img className="postimg" alt="post_image" src={require(`../../img/default.jpg`)} />
                    </div>
                }
                    <div className="data">
                        <p>{this.props.data.content}</p>
                        <span>
                               {this.link("Continue reading >>>")} 
                        </span>
                    </div>
                    <div className="clear"></div>
                </div>


        );
    }
};
