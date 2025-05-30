import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Link, useSearchParams } from 'react-router-dom';
import JoblyContext from './JoblyContext';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from './api';
import Loading from './Loading'
import SearchBar from './SearchBar';
import "./CompaniesList.css"

const CompaniesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allCompanies, setAllCompanies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { currentUser } = useContext(JoblyContext);

    const getCompanies = async (searchTerm) => {
        let companies = await JoblyApi.getAllCompanies(searchTerm);
        setAllCompanies(companies);
        setIsLoading(false);
    }

    useEffect(() => {
        const search = searchParams.get('search')
        setIsLoading(true);
        getCompanies(search || "");
    }, [searchParams]);

    if (isLoading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='companies-list container col-md-10 col-lg-8 col-xl-6 mx-auto'>
            <SearchBar setSearchParams={setSearchParams} currentPageUrl="/companies" setIsLoading={setIsLoading} />
            {searchParams.get('search')
                && <h2 className='mt-4'>Current Search: "{searchParams.get('search')}"</h2>}
            {allCompanies.map(company => (
                <Card className='my-4' key={company.handle}>
                    <Link to={`/companies/${company.handle}`}>
                        <CardBody>
                            <CardTitle tag="h5">{company.name}</CardTitle>
                            <CardText>{company.description}</CardText>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default CompaniesList;