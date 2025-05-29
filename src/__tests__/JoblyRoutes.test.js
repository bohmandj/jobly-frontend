import React from 'react';
import { screen, } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import JoblyRoutes from '../JoblyRoutes';
import JoblyApi from "../api";
import {
    renderHistoryWithContext,
    testUser,
    testJobsList,
    testCompany,
    testCompaniesList
} from '../testUtils';

jest.mock('../api.js')

beforeEach(() => {
    // mocking potential API responses
    JoblyApi.getAllCompanies.mockResolvedValue(testCompaniesList);
    JoblyApi.getCompany.mockResolvedValue(testCompany);
    JoblyApi.getAllJobs.mockResolvedValue(testJobsList);
})

describe('JoblyRoutes when signed in', () => {
    it('renders Home component w/ welcome message for / route', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: testUser },
                historyArr: ['/']
            }
        );
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        const regex = new RegExp(`Welcome back,\\s*${testUser.firstName}\\s*!`, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
    })

    it('renders Home component w/ welcome message for /bad-path route', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: testUser },
                historyArr: ['/bad-path']
            }
        );
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        const regex = new RegExp(`Welcome back,\\s*${testUser.firstName}\\s*!`, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
    })

    it('renders CompaniesList component for /companies route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: ['/companies']
                }
            );
        });
        expect(screen.getByText(testCompaniesList[0].name)).toBeInTheDocument();
        expect(screen.getByText(testCompaniesList[1].name)).toBeInTheDocument();
        expect(screen.getByText(testCompaniesList[2].name)).toBeInTheDocument();
    })

    it('renders CompanyDetail component for /companies/:handle route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        });
        expect(screen.getByText(testCompany.name)).toBeInTheDocument();
        expect(screen.getByText(testCompany.description)).toBeInTheDocument();
    })

    it('renders Jobs component for /jobs route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: ['/jobs']
                }
            );
        });
        expect(screen.getByText(testJobsList[0].title)).toBeInTheDocument();
        expect(screen.getByText(testJobsList[1].title)).toBeInTheDocument();
        expect(screen.getByText(testJobsList[2].title)).toBeInTheDocument();
    })

    it('redirects to Home component from /signup route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: testUser },
                historyArr: ['/signup']
            }
        );
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        const regex = new RegExp(`Welcome back,\\s*${testUser.firstName}\\s*!`, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
    })

    it('redirects to Home component from /login route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: testUser },
                historyArr: ['/login']
            }
        );
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        const regex = new RegExp(`Welcome back,\\s*${testUser.firstName}\\s*!`, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
    })

    it('renders ProfileForm component for /profile route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: testUser },
                historyArr: ['/profile']
            }
        );
        expect(screen.getByText(/profile/i)).toBeInTheDocument();
    })
})


describe('JoblyRoutes when not signed in', () => {
    it('renders Home component w/ login/signup btns for / route', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: null },
                historyArr: ['/']
            }
        );
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })

    it('redirects to Home component w/ login/signup btns for /bad-path route', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: null },
                historyArr: ['/bad-path']
            }
        );
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })

    it('redirects to Home component w/ login/signup btns for /companies route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: null },
                    historyArr: ['/companies']
                }
            );
        });
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })

    it('redirects to Home component w/ login/signup btns for /companies/:handle route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: null },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        });
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })

    it('redirects to Home component w/ login/signup btns for /jobs route', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <JoblyRoutes />,
                {
                    providerProps: { currentUser: null },
                    historyArr: ['/jobs']
                }
            );
        });
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })

    it('renders SignUpForm component from /signup route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: null },
                historyArr: ['/signup']
            }
        );
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    })

    it('renders LogInForm component for /login route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: null },
                historyArr: ['/login']
            }
        );
        expect(screen.getByText(/log in/i)).toBeInTheDocument();
    })

    it('redirects to Home component from /profile route when logged in', () => {
        renderHistoryWithContext(
            <JoblyRoutes />,
            {
                providerProps: { currentUser: null },
                historyArr: ['/profile']
            }
        );
        expect(screen.getByText(/Jobly!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    })
})