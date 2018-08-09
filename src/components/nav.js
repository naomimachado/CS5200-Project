import React from 'react';
import { Form, Button, FormGroup, Input } from 'reactstrap';
import $ from "jquery";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import api from '../api';

function Nav(props) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        console.log("data",data);
        let action = {
            type: 'UPDATE_LOGIN_FORM',
            data: data,
        };
        console.log(action);
        props.dispatch(action);

    }

    function login() {
        api.login(props.login);
    }

    return (
        <div className="navbar">
            <div className="float-right">
                <Form inline>
                    <FormGroup>
                        <Input type="email" name="email" placeholder="email"
                               value={props.login.email} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" placeholder="password"
                               value={props.login.password} onChange={update} />
                    </FormGroup>
                    <Button onClick={login} type="button" className="btn btn-primary">Log In</Button>
                </Form>
                <Link to="/registration" exact="true">New here? Register Now!</Link>
            </div>
        </div>
    );
}

function state2props(state) {
    console.log("rerender", state);
    return { login: state.login };
}

export default connect(state2props)(Nav);