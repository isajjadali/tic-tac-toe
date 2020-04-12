'use strict';

import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function DataTable(props) {
    const { columns, dataItems, actions } = props;

    return (
        dataItems.length
            ?
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <th
                                        key={index}
                                    >
                                        {column.title}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataItems.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        columns.map((column, $index) => {
                                            switch (column.type) {
                                                case 'index': {
                                                    return (
                                                        <td
                                                            key={$index}
                                                            className={column.cssClasses}
                                                        >

                                                            {index + 1}
                                                        </td>
                                                    )
                                                }
                                                case 'action': {
                                                    return (
                                                        <td
                                                            key={$index}
                                                            className="center-align-item"
                                                        >
                                                            {
                                                                (row[column.field] || []).map((action, $$index) => {
                                                                    return (
                                                                        <Button
                                                                            key={$$index}
                                                                            onClick={() => actions[action.command](row)}
                                                                            variant={action.variant}
                                                                            className="mr-2"
                                                                        >
                                                                            {action.title}
                                                                        </Button>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                    )
                                                }
                                                default: {
                                                    return (
                                                        <td
                                                            key={$index}
                                                            className={`${column.cssClasses} ${(row[column.field] || '').toLowerCase()}`}
                                                        >
                                                            {column.callback ? column.callback(row[column.field], column) : row[column.field]}
                                                        </td>
                                                    );
                                                }
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            : null
    );
}
