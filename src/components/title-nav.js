import React from 'react';

import {NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function TitleNav() {

    return (
        <div>
            <span className="navbar-brand navbar-nav">
                <NavItem>
                    <NavLink to="/">
                        <h2>Recommendation System</h2>
                    </NavLink>
                </NavItem>
            </span>
        </div>
    )

}