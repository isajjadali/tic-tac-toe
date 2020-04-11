'use strict';

export function actionsBuilder({ Statuses } = {}) {
    const defaultConfig = {
        precondition: () => true,
    }

    return [
        {
            ...defaultConfig,
            title: 'Play',
            command: 'onPlay',
            precondition: (status) => status === Statuses.Running,
        },
        {
            ...defaultConfig,
            title: 'View',
            command: 'onPlay',
            precondition: (status) => status !== Statuses.Running,
        },
        {
            ...defaultConfig,
            title: 'Delete',
            command: 'onDelete',
        }
    ]
}

export function parseBoard(board) {
    return board.split('');
}

export function convertBoard(board) {
    return board.join('');
}
