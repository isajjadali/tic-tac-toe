'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

// Enums & Configuration
import { RoutesConfiguration } from '../../shared/configuations/routes';

// Services
import GameService from '../../shared/services/games';

// Components
import Listing from '../../containers/Listing/Index';

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
