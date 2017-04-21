
import React from 'react';
import { Link } from 'react-router';
import logo from '../../img/wykop-2.jpg';

var headingSiteStyle = {
    padding: '100px 0 50px',
    color: 'white',
    marginTop: '0',
    textAlign: 'center',
};

export default class HeadingSite extends React.Component {
    render() {
        return (
            <div className="headerContent" style={headingSiteStyle}>
                <Link to="/">
                    <img className="logo" alt="" src={logo} />
                </Link>
                <h1 style={{ fontSize: '80px' }}>
                    Wykop 2.0
        </h1>
                <p style={{ fontSize: '24px' }}>
                    Najlepszy, bo napisany w react'cie
        </p>
            </div>
        );
    }
};