import React from 'react';

export default function Profile(props) {

    let token = props.props.token;

    return (
        <div>
            My profile:
            Name: {token.firstName}
        </div>
    );
}