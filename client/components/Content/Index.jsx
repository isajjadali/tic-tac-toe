'use strict';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './Index.scss';
import GetRoutes from '../../Routes';

export default function Content(porps) {
    return (
        <div className="content">
            <Router>
                {GetRoutes()}
            </Router>
        </div>
    );
} 
