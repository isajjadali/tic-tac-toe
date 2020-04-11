'use strict';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GetRoutes from '../../Routes';

export default function Content(porps) {
    return (
        <Router>
            {GetRoutes()}
        </Router>
    );
} 
