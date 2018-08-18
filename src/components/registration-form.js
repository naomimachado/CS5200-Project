import React from 'react';
import $ from "jquery";
//import swal from 'sweetalert';
import {Link, Redirect} from 'react-router-dom';

import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';
//import {Link} from "react-router-dom";

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

    function ValidateEmail()
    {
        var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("validating email",re.test(params.register.email));
        return re.test(params.register.email);
    }

    function validatePassword() {
        var pass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        console.log("validating password", params.register.password);
        return pass.test(params.register.password);
    }

        function register() {

            if(params.register.firstName === "" ||
                params.register.lastName === "" ||
                params.register.email === "" ||
                params.register.password === "" ||
                params.register.retype_password === "" ||
                params.register.dtype === ""){
                params.dispatch({type: 'ERROR', msg: 'All fields are mandatory'});
            } else if(!(params.register.password === params.register.retype_password)){
                params.dispatch({type: 'ERROR', msg: 'Passwords do not match'});
            } else if(ValidateEmail() === false){
                params.dispatch({type: 'ERROR', msg: 'Invalid e-mail address'});
            } else  if(validatePassword() === false){
                params.dispatch({type: 'ERROR', msg: 'Weak Password!'});
            } else {
                console.log("sending register request");
                api.submit_registration_by_admin(params.register);
            }
        }

        let button;

    function validate() {
        if(params.register.firstName === "" ||
            params.register.lastName === "" ||
            params.register.email === "" ||
            params.register.password === "" ||
            params.register.retype_password === ""){
            params.dispatch({type: 'ERROR', msg: 'All fields are mandatory'});
        } else if(!(params.register.password === params.register.retype_password)){
            params.dispatch({type: 'ERROR', msg: 'Passwords do not match'});
        } else if(ValidateEmail() === false){
            params.dispatch({type: 'ERROR', msg: 'Invalid e-mail address'});
        } else  if(validatePassword() === false) {
            params.dispatch({type: 'ERROR', msg: 'Weak Password!'});
        }
    }

    if(params.register.firstName === "" ||
        params.register.lastName === "" ||
        params.register.email === "" ||
        params.register.password === "" ||
        !(params.register.password === params.register.retype_password) ||
        ValidateEmail() === false ||
        validatePassword() === false){
        console.log("error");
        button = <Button onClick={validate} type="button" className="btn btn-primary">Edit</Button>;
    } else {
        console.log("sending edit request");
        button =
            <Link to={"/system"}>
                <Button onClick={register} type="button" className="btn btn-primary">Edit</Button>
            </Link>;
        //api.edit_profile(params.params.token.id,params.register);
    }

        if(params.params) {

            if (params.params.token == null) {

                return (
                    <div>
                        <h5>Registration Form</h5>
                        <FormGroup>
                            <FormGroup>
                                <Label for="dtype">I am a:</Label>
                                <Input type="select" name="dtype" value={params.register.dtype} onChange={update}>
                                    <option value="">Select</option>
                                    <option value="Viewer">Viewer</option>
                                    <option value="Critic">Critic</option>
                                    <option value="Seller">Vendor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">First Name:</Label>
                                <Input type="text" name="firstName" placeholder="First Name"
                                       value={params.register.firstName} onChange={update}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name:</Label>
                                <Input type="text" name="lastName" placeholder="Last Name"
                                       value={params.register.lastName} onChange={update}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email:</Label>
                                <Input type="email" name="email" placeholder="email"
                                       value={params.register.email} onChange={update}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password: <i>[Min. length 8, 1 Uppercase, 1 Number]</i></Label>
                                <Input type="password" name="password" placeholder="password"
                                       value={params.register.password} onChange={update}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="retype_password">Re-Type Password:</Label>
                                <Input type="password" name="retype_password" placeholder="retype password"
                                       value={params.register.retype_password} onChange={update}/>
                            </FormGroup>
                            <Button onClick={register} type="button" className="btn btn-primary">Register</Button>
                        </FormGroup>
                    </div>);
            } else {
                return (<Redirect to="/"/>);
            }
        } else {
            return (
                <div>
                    <h5>Registration Form</h5>
                    <FormGroup>
                        <FormGroup>
                            <Label for="dtype">I am a:</Label>
                            <Input type="select" name="dtype" value={params.register.dtype} onChange={update}>
                                <option value="">Select</option>
                                <option value="Viewer">Viewer</option>
                                <option value="Critic">Critic</option>
                                <option value="Seller">Vendor</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">First Name:</Label>
                            <Input type="text" name="firstName" placeholder="First Name"
                                   value={params.register.firstName} onChange={update}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name:</Label>
                            <Input type="text" name="lastName" placeholder="Last Name"
                                   value={params.register.lastName} onChange={update}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="email" name="email" placeholder="email"
                                   value={params.register.email} onChange={update}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password: <i>[Min. length 8, 1 Uppercase, 1 Number]</i></Label>
                            <Input type="password" name="password" placeholder="password"
                                   value={params.register.password} onChange={update}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="retype_password">Re-Type Password:</Label>
                            <Input type="password" name="retype_password" placeholder="retype password"
                                   value={params.register.retype_password} onChange={update}/>
                        </FormGroup>
                        { button }
                    </FormGroup>
                </div>);
        }
}

function state2props(state) {
    console.log("rerender", state);
    return { register: state.register };
}

export default connect(state2props)(RegistrationForm);