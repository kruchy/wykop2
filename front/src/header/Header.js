
import React from 'react';

import HeadingSite from './HeadingSite.js';

var headerStyle = {
    backgroundImage: 'url(img/wykop-2.jpg)',
    backgroundColor: '#808080',
    backgroundAttachment: 'scroll',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    backgroundSize: 'cover',
    marginBottom: '50px',
    width: '100%',
};

export default class Header extends React.Component {
    render() {
        return (
            <div className="header" style={headerStyle}>
                <HeadingSite />
            </div>
        );
    }
};