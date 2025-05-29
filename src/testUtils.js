import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JoblyContext from "./JoblyContext";

export const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <JoblyContext.Provider value={providerProps}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </JoblyContext.Provider>,
        renderOptions
    );
};

export const renderHistoryWithContext = (ui, { providerProps, historyArr, ...renderOptions }) => {
    return render(
        <JoblyContext.Provider value={providerProps}>
            <MemoryRouter initialEntries={historyArr}>
                {ui}
            </MemoryRouter>
        </JoblyContext.Provider>,
        renderOptions
    );
};

export const testUser = {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "joel@joelburton.com",
    isAdmin: false,
    applications: [111]
}

export const testJobUnapplied = {
    id: 999,
    title: "Worst Test Job Title",
    salary: 30000,
    equity: 0,
    companyHandle: "worst-test-company",
    companyName: "Worst Test Company"
}

export const testJobApplied = {
    id: testUser.applications[0],
    title: "Best Test Job Title",
    salary: 1000000,
    equity: 0.1,
    companyHandle: "best-test-co",
    companyName: "Best Test Co"
}

export const testJobsList = [
    {
        "id": testUser.applications[0],
        "title": "Test Job One",
        "salary": 111111,
        "equity": "0.1",
        "companyHandle": "test-company-one",
        "companyName": "Test Company One"
    },
    {
        "id": 222,
        "title": "Test Job Two",
        "salary": 222222,
        "equity": "0.2",
        "companyHandle": "test-company-two",
        "companyName": "Test Company Two"
    },
    {
        "id": 333,
        "title": "Test Job Three",
        "salary": 333333,
        "equity": "0.3",
        "companyHandle": "test-company-three",
        "companyName": "Test Company Three"
    }
]

export const testCompany = {
    handle: "test-company-handle",
    name: "Test Company Name",
    description: "Test description about this company.",
    numEmployees: 999,
    logoUrl: "/logos/logo3.png",
    jobs: [...testJobsList]
}

export const testCompaniesList = [
    {
        "handle": "test-company-one",
        "name": "Test Company One",
        "description": "Test description about first company.",
        "numEmployees": 123,
        "logoUrl": "/logos/logo1.png"
    },
    {
        "handle": "test-company-two",
        "name": "Test Company Two",
        "description": "Test description about second company.",
        "numEmployees": 234,
        "logoUrl": "/logos/logo2.png"
    },
    {
        "handle": "test-company-three",
        "name": "Test Company Three",
        "description": "Test description about third company.",
        "numEmployees": 345,
        "logoUrl": "/logos/logo3.png"
    }
]