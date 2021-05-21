import React, { Component } from 'react';
import { Nav } from "react-bootstrap";

class ModalTabsComponent extends Component {
    render() {
        const { notes, selectedComponent, firstName } = this.props;
        return (
            <div className="modalNav">
                <Nav
                    className="m-4 mt-3 mb-0"
                    activeKey="details"
                    onSelect={(selectedKey) => this.props.handleSelect(selectedKey)}>
                    <Nav.Item>
                        <Nav.Link eventKey="details" className={`${selectedComponent === "details" ? "selected-item" : ""}`}>Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="notes">
                    <Nav.Link eventKey="notes" className={`${selectedComponent === "notes" ? "selected-item" : ""}`}>
                        {notes && notes[firstName] && notes[firstName].length > 0 ? `Notes(${notes[firstName].length})` : "Notes"}
                    </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }
}

export default ModalTabsComponent;
