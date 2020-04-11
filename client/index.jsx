import React from 'react';
import { render } from 'react-dom';
import styles from "./styles/main.scss";
import { axiosInterceptor } from './shared/utils/interceptors';
axiosInterceptor();

import Navbar from './components/Navbar/Index';
import Content from './components/Content/Index';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar title="Tic Tac Toe" />
                <Content />
            </React.Fragment>
        )
    }
}

render(<App />, document.getElementById('app'));
