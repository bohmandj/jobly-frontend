import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import JoblyContext from './JoblyContext';
import JoblyApi from './api';
import Loading from './Loading'
import JobCard from './JobCard'

// { handle, name, description, numEmployees, logoUrl, jobs }
//   where jobs is [{ id, title, salary, equity }, ...] 
const CompanyDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});

    const { currentUser } = useContext(JoblyContext);
    const { handle } = useParams();

    const getCompany = async () => {
        let returnedCompany = await JoblyApi.getCompany(handle);
        setCompany(returnedCompany);
        setIsLoading(false);
    }

    useEffect(() => {
        getCompany();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='company-details container col-md-10 col-lg-8 col-xl-6 mx-auto'>
            <h1 className='mt-4'>{company.name}</h1>
            <p>{company.description}</p>
            {company.jobs.map(job => (
                <JobCard job={job} showCompanyName={false} key={job.id} />
            ))}
        </div>
    )
}

export default CompanyDetails;