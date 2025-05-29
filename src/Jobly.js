import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import JoblyApi from './api';
import NavBar from './NavBar';
import JoblyRoutes from './JoblyRoutes';
import Loading from './Loading';
import JoblyContext from './JoblyContext';

const Jobly = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    await applyToken(storedToken);
                } catch (err) {
                    console.error("Error loading user:", err);
                    setCurrentUser(false);
                    setToken(false);
                }
            }
            setIsLoading(false);
        };

        loadUser();
    }, []);

    const getUser = async (username) => {
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
    }

    const applyToken = async (tokenStr) => {
        JoblyApi.token = tokenStr;
        const { username } = jwt_decode(tokenStr);
        await getUser(username);
        setToken(tokenStr);
    }

    const login = async (loginFormData) => {
        const {
            username,
            password
        } = loginFormData;
        const returnedToken = await JoblyApi.loginUser(username, password);
        localStorage.setItem("token", returnedToken);
        await applyToken(returnedToken);
        navigate('/');
    }

    const register = async (registrationFormData) => {
        const {
            username,
            password,
            firstName,
            lastName,
            email
        } = registrationFormData;
        const returnedToken = await JoblyApi.registerUser(username, password, firstName, lastName, email);
        localStorage.setItem("token", returnedToken);
        await applyToken(returnedToken);
        navigate('/');
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(false);
        setCurrentUser(false);
        navigate('/');
    }

    const updateUser = async (profileFormData) => {
        const {
            firstName,
            lastName,
            email
        } = profileFormData;
        const returnedUser = await JoblyApi.updateUser(currentUser.username, firstName, lastName, email);
        setCurrentUser({
            ...currentUser,
            firstName: returnedUser.firstName,
            lastName: returnedUser.lastName,
            email: returnedUser.email
        });
        navigate('/');
    }

    const applyToJob = async (id) => {
        await JoblyApi.applyToJob(currentUser.username, id);
        getUser(currentUser.username);
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='Jobly'>
            <JoblyContext.Provider value={{ currentUser, login, register, logout, updateUser, applyToJob }}>
                <NavBar />
                <JoblyRoutes />
            </JoblyContext.Provider>
        </div>
    )
}

export default Jobly;