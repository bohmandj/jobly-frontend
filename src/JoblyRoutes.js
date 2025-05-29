import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import CompanyDetail from './CompanyDetail';
import CompaniesList from './CompaniesList';
import JobsList from './JobsList';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import ProfileForm from './ProfileForm';

const JoblyRoutes = () => {
    return (
        <Routes>
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default JoblyRoutes;