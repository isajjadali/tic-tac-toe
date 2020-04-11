'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import GameService from '../../shared/services/games';
import Listing from '../../containers/Listing/Index';
import { RoutesConfiguration } from '../../shared/configuations/routes';
import {
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
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
            <Container>
                <Row className="p-5">
                    <Col className="center-align-item">
                        <Button className="p-3" onClick={() => this.onPlayGame()}>Play New Game</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Listing />
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(Home);
