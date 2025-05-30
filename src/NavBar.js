import React, { useContext } from "react";
import JoblyContext from "./JoblyContext";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

const NavBar = () => {

    const { currentUser, logout } = useContext(JoblyContext);

    return (
        <Navbar expand="md" fixed="top">
            <NavLink end="true" to="/" className="navbar-brand">
                Jobly
            </NavLink>

            {currentUser
                ? <Nav className="ml-auto nav-grid" navbar>
                    <NavItem>
                        <NavLink to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/loading" onClick={() => { logout() }}>Log out</NavLink>
                    </NavItem>
                </Nav>
                : <Nav className="ml-auto nav-grid" navbar>
                    <NavItem>
                        <NavLink to="/login">Log in</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/signup">Sign up</NavLink>
                    </NavItem>
                </Nav>
            }
        </Navbar>
    );
}

export default NavBar;