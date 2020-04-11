import React from 'react';
import { Navbar } from 'react-bootstrap'

export default function CustomizeNavbar(props) {
    const { title, createdBy, portfolioLink } = props;

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >{title}</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Created By: <a href={portfolioLink} target="_blank">{createdBy}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}
