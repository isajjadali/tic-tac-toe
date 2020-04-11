import React from 'react';
import styles from './index.scss';

export default function Table(props) {
    const { columns, dataItems, actions } = props;

    return (
        dataItems.length
            ?
            <table>
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
                                                        >

                                                            {index + 1}
                                                        </td>
                                                    )
                                                }
                                                case 'action': {
                                                    return (
                                                        <td
                                                            key={$index}
                                                        >
                                                            {
                                                                (row[column.field] || []).map((action, $$index) => {
                                                                    return (
                                                                        <button
                                                                            key={$$index}
                                                                            onClick={() => actions[action.command](row)}
                                                                        >
                                                                            {action.title}
                                                                        </button>
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
                                                        >
                                                            {column.callback ? column.callback(row[column.field]) : row[column.field]}
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
            </table>
            : null
    );
}
