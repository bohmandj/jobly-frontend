import React, { useContext, useState } from 'react';
import JoblyContext from './JoblyContext';
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";

const JobCard = ({ job, showCompanyName = false }) => {
    const [isApplied, setIsApplied] = useState(false);
    const { currentUser, applyToJob } = useContext(JoblyContext);

    if (!isApplied && currentUser.applications.includes(job.id)) {
        setIsApplied(true);
    }

    const apply = () => {
        const appSubmitted = applyToJob(job.id);
        if (appSubmitted) setIsApplied(true);
    }

    return (
        <Card className='my-4'>
            <CardBody>
                <CardTitle tag="h5">{job.title}</CardTitle>
                {showCompanyName && <CardSubtitle className='fs-5'>{job.companyName}</CardSubtitle>}
                <CardText className='mb-1 mt-3'>{`Salary: ${job.salary}`}</CardText>
                <CardText>{`Equity: ${job.equity}`}</CardText>
                {isApplied
                    ? <button
                        className='btn btn-success fw-bold text-uppercase float-end'
                        disabled
                    >Applied</button>
                    : <button
                        className='btn btn-danger fw-bold text-uppercase float-end'
                        onClick={() => apply()}
                    >Apply</button>
                }
            </CardBody>
        </Card>
    )
}

export default JobCard;