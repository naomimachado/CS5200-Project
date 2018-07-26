import React from 'react';
import $ from "jquery";

import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';

function RegistrationForm(params) {

    function update(ev) {
            let tgt = $(ev.target);

            let data = {};
            data[tgt.attr('name')] = tgt.val();
            console.log("data",data);
            let action = {
            type: 'UPDATE_REGISTER_FORM',
            data: data,
            };
            console.log("update action",action);
            params.dispatch(action);
        }

        function register() {
                console.log("sending regiter request");
                api.submit_registration(params.register);
        }

            return (
            <div>
                <h2>Registration Form</h2>
                <FormGroup>
                    <FormGroup>
                        <Label for="firstName">First Name:</Label>
                        <Input type="text" name="firstName" placeholder="First Name"
                               value={params.register.firstName} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name:</Label>
                        <Input type="text" name="lastName" placeholder="Last Name"
                               value={params.register.lastName} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input type="text" name="username" placeholder="username"
                               value={params.register.username} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="password" name="password" placeholder="password"
                               value={params.register.password} onChange={update} />
                    </FormGroup>
                    <Button onClick={register} type="button" className="btn btn-primary">Register</Button>
                </FormGroup>
        </div>);
}

function state2props(state) {
    console.log("rerender", state);
    return { register: state.register };
}

export default connect(state2props)(RegistrationForm);