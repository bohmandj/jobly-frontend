import React from 'react';
import { Navbar, NavLink } from "reactstrap";

const Loading = () => {
    return (
        <div className='Jobly'>
            <Navbar expand="md" fixed="top">
                <NavLink end="true" to="/" className="navbar-brand">
                    Jobly
                </NavLink>
            </Navbar>
            <h3 className='text-center my-auto'>Loading &hellip;</h3>;
        </div>
    )
}

export default Loading;