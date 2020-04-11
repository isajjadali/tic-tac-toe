'use strict';

import React from 'react';
import styles from './Index.scss';
import Playground from '../Playground/Index';
import { BrowserRouter as Router } from 'react-router-dom';
import GetRoutes from '../../Routes';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <Router>
                    {GetRoutes()}
                </Router>
            </div>
        );
    }
} 
