'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';

// Enums & Configurations
import Enums from '../../shared/utils/enums';
import { ListingColumns } from '../../shared/configuations/grid';
import { RoutesConfiguration } from '../../shared/configuations/routes';

// Services
import GameService from '../../shared/services/games';
import { actionsBuilder } from '../../shared/services/common';

// Components
import DataTable from '../../components/DataTable/Index';
class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataItems: [],
        };
        this.actionsButtons = actionsBuilder({ Statuses: Enums.Statuses });
    }

    /**
     * Call `_loaditems` Method To Load The Games.
     */
    componentDidMount() {
        this._loadItems();
    }

    /**
     * Fetch Data From Server, Call `_setActionButtons` method And Set The State.
     * @private
     */
    _loadItems() {
        GameService.get()
            .then(res => {
                const { dataItems } = res.data;
                this._setActionButtons(dataItems);
                this.setState({ dataItems });
            });
    }

    /**
     * Set $$Actions Array For Each Item Of Array.
     * @param {Array} dataItems
     * @private
     */
    _setActionButtons(dataItems = []) {
        dataItems.forEach(item => {
            item.$$actions = this.actionsButtons
                .filter(action => action.precondition(item.status));
        });
    }

    /**
     * Delete The Game And Call `_loaditems` Methods To Sync Latest Data.
     * @param {object} item
     */
    onDelete(item = {}) {
        GameService.delete(item.id)
            .then(res => this._loadItems());
    }

     /**
     * Move User To Playground Area Of Specific Game.
     * @param {object} item
     */
    onPlay(item = {}) {
        this.props.history.push(`${RoutesConfiguration.playground.path}/${item.id}`);
    }

    render() {
        const { dataItems } = this.state;
        return (
            <div className="listing">
                <DataTable
                    dataItems={dataItems}
                    columns={ListingColumns(Enums.CapitalizedStatuses)}
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
