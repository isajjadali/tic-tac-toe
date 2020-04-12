'use strict';

/**
 * Action Builder For Games.
 * @param {object}
 * @returns {Array}
 */
export function actionsBuilder({ Statuses } = {}) {
    const defaultConfig = {
        precondition: () => true,
    }

    return [
        {
            ...defaultConfig,
            title: 'Play',
            command: 'onPlay',
            variant: 'success',
            precondition: (status) => status === Statuses.Running,
        },
        {
            ...defaultConfig,
            title: 'View',
            command: 'onPlay',
            variant: 'primary',
            precondition: (status) => status !== Statuses.Running,
        },
        {
            ...defaultConfig,
            title: 'Delete',
            command: 'onDelete',
            variant: 'danger',
        }
    ]
}

/**
 * Parse Board in Array
 * @param {string} board
 * @returns {Array}
 */
export function parseBoard(board) {
    return board.split('');
}

/**
 * Convert Board In A String.
 * @param {Array} board
 * @returns {string}
 */
export function convertBoard(board) {
    return board.join('');
}
