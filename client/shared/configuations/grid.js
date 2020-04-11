'use strict';

/**
 * Grid Configurations For Listing Component
 * @param {string} CapitalizedStatuses
 * @return {Array}
 */
export function ListingColumns(CapitalizedStatuses) {
    return [
        {
            title: 'Index',
            type: 'index'
        },
        {
            field: 'id',
            title: 'UUID',
            availableOnDetail: true,
        },
        {
            field: 'status',
            title: 'Status',
            availableOnDetail: true,
            callback: (status) => CapitalizedStatuses[status]
        },
        {
            field: '$$actions',
            title: 'Actions',
            type: 'action'
        },
    ]
};
