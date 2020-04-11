'use strict';

import React from 'react';
import styles from './Index.scss';
import { withRouter } from 'react-router-dom';
import Table from '../../components/Table/Index';
import { ListingColumns } from '../../shared/configuations/grid';
import Enums from '../../shared/utils/enums';
import GameService from '../../shared/services/games';
import Block from '../../containers/Block/Index';
import { convertBoard, parseBoard } from '../../shared/services/common';

class Playground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: [],
            }
        }
        this.columns = ListingColumns(Enums.StatusTranslations)
            .filter(column => column.availableOnDetail)
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        id && this._fetchGameDetails(id);
    }

    _fetchGameDetails(id) {
        GameService
            .get(id)
            .then(this._parseResponse.bind(this))
            .catch(err => this.setState({ error: err.reason }));
    }

    _updateBoard(updatedGame) {
        GameService
            .update(updatedGame.id, { board: convertBoard(updatedGame.board) })
            .then(this._parseResponse.bind(this));
    }

    _parseResponse(response) {
        const game = { ...response.data.data };
        game.board = parseBoard(game.board);
        this.setState({ game: game });
    }

    onBack() {
        this.props.history.goBack();
    }

    onSelectingMove(block, move) {
        const game = { ...this.state.game };
        game.board[block] = move;
        this._updateBoard(game);
    }

    render() {
        const { game, error } = this.state;
        return (
            <div className="playground">
                {
                    error ?
                        <div className="error">
                            <h2>{error}</h2>
                        </div>
                        :
                        <React.Fragment>
                            <div>
                                <button onClick={() => this.onBack()}>Back</button>
                                <Table
                                    columns={this.columns}
                                    dataItems={[this.state.game]}
                                />
                            </div>
                            <div className={`block-container ${game.status !== Enums.Statuses.Running ? 'disabled' : ''}`}>
                                {
                                    game.board.map((move, index) => {
                                        return (
                                            <Block
                                                key={index}
                                                blockNumber={index}
                                                move={move}
                                                onSelectingMove={this.onSelectingMove.bind(this)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </React.Fragment>
                }
            </div>
        );
    }
}
export default withRouter(Playground);
