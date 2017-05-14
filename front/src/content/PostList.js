
import React from 'react';
import PostItem from './PostItem.js';

const mockData = {
    "data": [
        {
            "id": "0",
            "author": "Paweł",
            "img" : "img1.jpg",
            "title": "Hello blog 1",
            "summary": "Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editorsLorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors.Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editorsLorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors.",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "1",
            "author": "Paweł",
            "img": "img2.jpg",
            "title": "Hello blog 2",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2012-03-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "author": "Paweł",
            "img": "img3.jpg",
            "title": "Hello blog 3",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2012-02-23T18:25:43.511Z"
        },
        {
            "id": "3",
            "author": "Paweł",
            "img": "img1.jpg",
            "title": "Hello blog 4",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2012-01-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "author": "Paweł",
            "img": "img2.jpg",
            "title": "Hello blog 5",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2011-04-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "author": "Paweł",
            "img": "img3.jpg",
            "title": "Hello blog 6",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2011-03-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "author": "Paweł",
            "img": "img1.jpg",
            "title": "Hello blog 6",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2011-02-23T18:25:43.511Z"
        },
        {
            "id": "7",
            "author": "Paweł",
            "img": "img2.jpg",
            "title": "Hello blog 7",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2011-01-23T18:25:43.511Z"
        },
        {
            "id": "8",
            "author": "Paweł",
            "img": "img3.jpg",
            "title": "Hello blog 8",
            "summary": "Silent sir say desire fat him letter.",
            "date": "2010-04-23T18:25:43.511Z"
        }
    ],
};

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            data: mockData["data"]
        };
    }

    componentDidMount() {
        this.setState({ data: mockData["data"] });
    }

    render() {
        const posts = this.state.data.map(function (post) {
            return (
                <PostItem key={post.id} data={post} />
             );
        });

        return (

                  <div className="content">
                {posts}
                        
                    </div>
               

        );
    }
};
