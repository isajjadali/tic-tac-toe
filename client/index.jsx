'use strict';

import React from 'react';
import { render } from 'react-dom';

// Axios Interceptor 
import { axiosInterceptor } from './shared/utils/interceptors';
axiosInterceptor();

// Scss Main File
import styles from "./styles/main.scss";

// Components
import CustomizeNavbar from './components/CustomizeNavbar/Index';
import Content from './components/Content/Index';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CustomizeNavbar
                    title="Tic Tac Toe"
                    portfolioLink="https://isajjadali.github.io/"
                    createdBy="Sajjad Ali (Javascript Full Stack Engineer)"
                />
                <Content />
            </React.Fragment>
        )
    }
}

render(<App />, document.getElementById('app'));
