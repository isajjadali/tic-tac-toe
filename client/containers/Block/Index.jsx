'use strict';

import React from 'react';
import styles from './Index.scss';
import Enums from '../../shared/utils/enums';

export default class Block extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            move: this.props.move || Enums.Moves.Empty,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.move !== nextProps.move) {
            this.setState({ move: nextProps.move });
        }
    }

    onClick() {
        this.setState({ move: Enums.Moves.Client }, () => {
            this.props.onSelectingMove(this.props.blockNumber, this.state.move)
        })
    }

    render() {
        const { move } = this.state;
        return (
            <div
                className={`block ${move !== Enums.Moves.Empty ? 'disabled' : ''}`}
                onClick={() => this.onClick()}
            >
                <span>{move !== Enums.Moves.Empty && move}</span>
            </div>
        );
    }
}
