import React from 'react';
import styles from './Index.scss';

export default function Navbar(props) {
    const { title } = props;

    return (
        <div className="navbar">
            <span>{title}</span>
        </div>
    );
}
