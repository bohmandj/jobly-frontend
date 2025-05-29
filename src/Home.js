import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import JoblyContext from './JoblyContext';

const Home = () => {

    const { currentUser } = useContext(JoblyContext);
    const navigate = useNavigate();
    return (
        <div className='homepage my-auto'>
            <div className='container text-center'>
                <h1>Jobly!</h1>
                <p>All the jobs in one, convenient place.</p>
                {currentUser
                    ?
                    <h2>Welcome back, {currentUser.firstName}!</h2>
                    : <div>
                        <button
                            className='btn btn-primary fw-bold me-3 col-2'
                            onClick={() => navigate('/login')}
                        >Log in</button>
                        <button
                            className='btn btn-primary fw-bold col-2'
                            onClick={() => navigate('/signup')}
                        >Sign up</button>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home;