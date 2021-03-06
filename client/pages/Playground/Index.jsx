'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

// Enums & Configurations
import Enums from '../../shared/utils/enums';
import { ListingColumns } from '../../shared/configuations/grid';

// Services
import GameService from '../../shared/services/games';
import { convertBoard, parseBoard } from '../../shared/services/common';

// Components
import DataTable from '../../components/DataTable/Index';
import Block from '../../containers/Block/Index';

class Playground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: [],
            }
        }
        this.columns = ListingColumns(Enums.CapitalizedStatuses)
            .filter(column => column.availableOnDetail)
    }

    /**
     * Fetch Id From Params And Call `_fetchgamedetails` Method To Get Game Details.
     */
    componentWillMount() {
        const { id } = this.props.match.params;
        id && this._fetchGameDetails(id);
    }

    /**
     * Fetch Data Of A Specific Game From Server and call `_parseResponse` method.
     * @param {string} id
     * @private
     */
    async _fetchGameDetails(id = '') {
        const response = await GameService
            .get(id)
            .catch(err => this.setState({ error: err.reason }));;
        this._parseResponse(response);
    }

    /**
     * Update Board Of A Specific Game and call `_parseResponse` method.
     * @param {object} updatedGame
     * @private
     */
    async _updateBoard(updatedGame = {}) {
        const response = await GameService
            .update(updatedGame.id, { board: convertBoard(updatedGame.board) });
        this._parseResponse(response);
    }

    /**
     * Parse Response And Update The Current State Of Game.
     * @param {object} response
     * @private
     */
    _parseResponse(response = {}) {
        const game = { ...response.data.data };
        game.board = parseBoard(game.board);
        this.setState({ game: game });
    }

    /**
     * On Pressing Back Button, Move To Listing Games Layout.
     */
    onBack() {
        this.props.history.goBack();
    }

    /**
     * On Selecting Move Of Client, It Update The Current State Of Game By Call `_updateboard` Method.
     * @param {object} response
     */
    onSelectingMove(block, move) {
        const game = { ...this.state.game };
        game.board[block] = move;
        this._updateBoard(game);
    }

    render() {
        const { game, error } = this.state;
        return (
            <React.Fragment>
                <Row className="p-3">
                    <Col>
                        <Button variant="primary" onClick={() => this.onBack()}>Back</Button>
                    </Col>
                </Row>
                <Container>
                    {
                        error ?
                            <Row>
                                <Col className="center-align-item">
                                    <h5>{error}</h5>
                                </Col>
                            </Row> :
                            <React.Fragment>
                                <Row>
                                    <Col>
                                        <DataTable columns={this.columns} dataItems={[this.state.game]} />
                                    </Col>
                                </Row>
                                <span className="center-align-item">
                                    <Row className={`game-board ${game.status !== Enums.Statuses.Running ? 'disabled' : ''}`}>
                                        {
                                            game.board.map((move, index) => {
                                                return (
                                                    <Col
                                                        key={index}
                                                        className="p-0"
                                                        lg="4" sm="4" xs="4" md="4"
                                                    >
                                                        <Block
                                                            blockNumber={index}
                                                            move={move}
                                                            onSelectingMove={this.onSelectingMove.bind(this)}
                                                        />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </span>
                            </React.Fragment>
                    }
                </Container>
            </React.Fragment>
        );
    }
}
export default withRouter(Playground);
