'use strict';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

// Configuration
import { RoutesConfiguration } from './shared/configuations/routes';

// Components
import Playground from './pages/Playground/Index';
import Home from './pages/Home/Index';

const Routes = [
    {
        ...RoutesConfiguration.playground,
        component: Playground
    },
    {
        ...RoutesConfiguration.home,
        component: Home
    },
];

/**
 * Create Routes
 */
export default function GetRoutes() {
    return (
        <Switch>
            {
                Routes.map((route, index) => {
                    return <Route exact key={index} path={route.params
                        ? mapParamsInRoutePath(route.path, route.params)
                        : route.path
                    } component={route.component} />
                })
            }
            <Route exact path='/'>
                <Redirect to={RoutesConfiguration.home.path} />
            </Route>
        </Switch>
    )
}

/**
 * Map Params in Route
 * @param {string} path
 * @param {array} params
 * @returns {string}
 */
function mapParamsInRoutePath(path, params) {
    return `${path}/:${params.join('/:')}`
}
