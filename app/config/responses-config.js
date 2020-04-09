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
    '400, 404, 500': {
        response: {
            defaults: {
                string: {
                    field: 'error',
                    defaultValue: 'Default Error',
                    hideIfNotExist: true,
                },
                object: {
                    field: 'error',
                    defaultValue: {},
                    hideIfNotExist: true,
                }
            },
        },
    },
};
