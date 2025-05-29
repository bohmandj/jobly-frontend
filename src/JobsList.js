import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import JoblyContext from './JoblyContext';
import JoblyApi from './api';
import Loading from './Loading'
import JobCard from './JobCard'
import SearchBar from './SearchBar';

const JobsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allJobs, setAllJobs] = useState([]);

    const { currentUser } = useContext(JoblyContext);

    const getJobs = async (query = "") => {
        let jobs = await JoblyApi.getAllJobs(query);
        setAllJobs(jobs);
        setIsLoading(false);
    }

    useEffect(() => {
        getJobs();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='jobs-list container col-md-10 col-lg-8 col-xl-6 mx-auto'>
            <SearchBar apiSearchFn={getJobs} setIsLoading={setIsLoading} />
            {allJobs.map(job => (
                <JobCard job={job} showCompanyName={true} key={job.id} />
            ))}
        </div>
    )
}

export default JobsList;