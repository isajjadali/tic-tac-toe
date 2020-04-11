'use strict';

/**
 * Configurations For Routes
 * @readonly
 */
export const RoutesConfiguration = Object.freeze({
    home: {
        basePath: '/',
        path: '/home',
    },
    playground: {
        path: '/playground',
        params: ['id'],
    },
});
