import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.css'

const  navbar = ({activeUser}) => {
    return (
        <nav className="nav-wrapper blue darken-3 navBarPadding">
            <div className="brand-logo">Loan Tracking Portal</div>
            <ul className="right">
                <li><NavLink to="/dashboard">Loan Applications</NavLink></li>
                <li><NavLink to="/unitstations">Unit Stations</NavLink></li>
                <li><NavLink to="/loanstatus">Loan Status</NavLink></li>
            </ul>
        </nav>
    )
}

export default navbar;
