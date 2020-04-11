'use strict';

import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import styles from './Index.scss';
import Table from '../../components/Table/Index';
import GameService from '../../shared/services/games';
import { actionsBuilder } from '../../shared/services/common';
import { ListingColumns } from '../../shared/configuations/grid';
import Enums from '../../shared/utils/enums';
import { RoutesConfiguration } from '../../shared/configuations/routes';

class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataItems: [],
        };
        this.actionsButtons = actionsBuilder({ Statuses: Enums.Statuses });
    }

    componentDidMount() {
        this._loadItems();
    }

    _loadItems() {
        GameService.get()
            .then(res => {
                const { dataItems } = res.data;
                this._getActionButtons(dataItems);
                this.setState({ dataItems });
            });
    }

    _getActionButtons(dataItems = []) {
        dataItems.forEach(item => {
            item.$$actions = this.actionsButtons
                .filter(action => action.precondition(item.status));
        });
    }

    onDelete(item = {}) {
        GameService.delete(item.id)
            .then(res => this._loadItems());
    }

    onPlay(item = {}) {
        this.props.history.push(`${RoutesConfiguration.playground.path}/${item.id}`);
    }

    render() {
        const { dataItems } = this.state;
        return (
            <div className="listing">
                <Table
                    dataItems={dataItems}
                    columns={ListingColumns(Enums.StatusTranslations)}
                    actions={{
                        onDelete: this.onDelete.bind(this),
                        onPlay: this.onPlay.bind(this),
                    }}
                />
            </div>
        );
    }
}
export default withRouter(Listing);
