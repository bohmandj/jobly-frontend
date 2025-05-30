import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import JoblyContext from './JoblyContext';
import JoblyApi from './api';
import Loading from './Loading'
import JobCard from './JobCard'
import SearchBar from './SearchBar';

const JobsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allJobs, setAllJobs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { currentUser } = useContext(JoblyContext);

    const getJobs = async (searchTerm = "") => {
        let jobs = await JoblyApi.getAllJobs(searchTerm);
        setAllJobs(jobs);
        setIsLoading(false);
    }

    useEffect(() => {
        const search = searchParams.get('search')
        setIsLoading(true);
        getJobs(search || "");
    }, [searchParams]);

    if (isLoading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='jobs-list container col-md-10 col-lg-8 col-xl-6 mx-auto'>
            <SearchBar setSearchParams={setSearchParams} currentPageUrl="/jobs" setIsLoading={setIsLoading} />
            {searchParams.get('search')
                && <h2 className='mt-4'>Current Search: "{searchParams.get('search')}"</h2>}
            {allJobs.map(job => (
                <JobCard job={job} showCompanyName={true} key={job.id} />
            ))}
        </div>
    )
}

export default JobsList;