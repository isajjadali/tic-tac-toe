'use strict';

export function ListingColumns(StatusTranslations) {
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
            callback: (status) => StatusTranslations[status]
        },
        {
            field: '$$actions',
            title: 'Actions',
            type: 'action'
        },
    ]
};
