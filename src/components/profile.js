import React from 'react';
import Cookies from "universal-cookie";

export default function Profile(props) {

    let token = props.props.token;
    let name;
    let cookie = new Cookies();
    if(token==null){
        name = cookie.get('name');
    } else {
        name = token.firstName;
    }

    return (
        <div>
            My profile:
            Name: {name}
        </div>
    );
}