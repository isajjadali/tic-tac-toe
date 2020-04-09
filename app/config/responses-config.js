module.exports = {
    '200': {
        response: {
            defaults: {
                string: {
                    field: 'message',
                    defaultValue: 'success',
                    hideIfNotExist: true,
                },
                object: {
                    field: 'data',
                    defaultValue: {},
                    hideIfNotExist: true,
                },
                array: {
                    field: 'dataItems',
                    defaultValue: [],
                    hideIfNotExist: true,
                }
            },
        }
    },
    '400, 404': {
        response: {
            defaults: {
                string: {
                    field: 'reason',
                    defaultValue: '',
                    hideIfNotExist: true,
                },
            },
        },
    },
};
