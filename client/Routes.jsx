'use strict';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

// Configuration
import { RoutesConfiguration } from './shared/configuations/routes';

// Components
import Playground from './pages/Playground/Index';
import Listing from './containers/Listing/Index';

const Routes = [
    {
        ...RoutesConfiguration.playground,
        component: Playground
    },
    {
        ...RoutesConfiguration.listing,
        component: Listing
    },
];

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
                <Redirect to={RoutesConfiguration.listing.path} />
            </Route>
        </Switch>
    )
}

function mapParamsInRoutePath(path, params) {
    return `${path}/:${params.join('/:')}`
}
