

import React from 'react';

var pagerStyle = {
    width: '1000px',
    margin: '0 auto',
};

export default class Pager extends React.Component {
    render() {
        return (
            <div className="pager" style={pagerStyle}>
                <a href="" style={{ textDecoration: 'none', color: 'black', float: 'right' }}>
                    OLDER POSTS
				</a>
            </div>
        );
    }
};