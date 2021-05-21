import React, { Component } from 'react';
import { Form } from "react-bootstrap";

class DetailsComponent extends Component {
    render() {
        return (
            <div>
              <Form className="formData">
                <label>First Name: {this.props.selectedPatient.First}</label><br/><br/>
                <label>Last Name: {this.props.selectedPatient.Last}</label><br/><br/>
                <label>DOB: {this.props.selectedPatient.DOB}</label><br/><br/>
                <label>Email: {this.props.selectedPatient.Email}</label><br/><br/>
                <label>phoneNo: {this.props.selectedPatient.phoneNo}</label>
              </Form>
            </div>
        )
    }
}

export default DetailsComponent;