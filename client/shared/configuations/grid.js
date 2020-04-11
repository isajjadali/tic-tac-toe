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
            title: '$uuid',
            availableOnDetail: true,
        },
        {
            field: 'status',
            title: 'Status',
            availableOnDetail: true,
            cssClasses: 'font-weight-bold',
            callback: (status) => CapitalizedStatuses[status]
        },
        {
            field: '$$actions',
            title: 'Actions',
            type: 'action'
        },
    ]
};
