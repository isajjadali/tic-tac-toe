'use strict';

import React from 'react';
import styles from './Index.scss';
import { withRouter } from 'react-router-dom';
import GameService from '../../shared/services/games';
import Listing from '../../containers/Listing/Index';

import { RoutesConfiguration } from '../../shared/configuations/routes';
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Create A New Game And Redirect To That Game Location.
     */
    onPlayGame() {
        GameService
            .create()
            .then(res => {
                this.props.history.push(`${RoutesConfiguration.playground.path}/${res.data.data.id}`);
            });
    }

    render() {
        return (
            <div className="home">
                <div>
                    <button onClick={() => this.onPlayGame()}>Play Game</button>
                </div>
                <Listing />
            </div>
        );
    }
}
export default withRouter(Home);
