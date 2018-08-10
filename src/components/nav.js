import React from 'react';
import { Form, Button, FormGroup, Input } from 'reactstrap';
import $ from "jquery";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';
import store from "../store";
import TitleNav from "./title-nav";


let Login = connect(({login}) => {return {login};})((props) =>{

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
                               value={props.login.email} onChange={update}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" placeholder="password"
                               value={props.login.password} onChange={update}/>
                    </FormGroup>
                    <Button onClick={login} type="button" className="btn btn-primary">Login</Button>
                </Form>
                <Link to="/registration" exact="true">New here? Register Now!</Link>
            </div>
        </div>
    );
})



let Session = connect(({token}) => {return {token};})((props) => {

    function logout(){
        console.log("making logout call");
        api.logout();
    }

    return <div className="navbar">
        <p>Welcome {props.token.firstName}!</p>
                <Link to={"/"}><Button onClick={logout} className="btn btn-danger">Logout</Button></Link>
         </div>;
});

function Nav(props) {

    let session;
    let cookie = new Cookies();
    let token;

    if(props.token){
        session = <Session token={props.token}/>
    } else if(cookie.get('email')){
        token = { firstName: cookie.get('firstName'), email: cookie.get('email'), obj: cookie.get('obj')};
        store.dispatch({
            type: 'SET_TOKEN',
            data: token
        })
        session = <Session token={token}/>
    } else {
        session = <Login/>
    }

            return (
                <div className="navbar">
                    <TitleNav/>
                    <span className="navbar-text">
	                 { session }
                    </span>
                </div>
            );
}

function state2props(state) {
    console.log("rerender", state);
    return { token: state.token };
}

export default connect(state2props)(Nav);