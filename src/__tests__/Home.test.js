import React from 'react';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { renderWithContext, renderHistoryWithContext, testUser } from '../testUtils';

describe('Home', () => {
    it("renders without crashing without currentUser", async () => {
        renderWithContext(<Home />, {
            providerProps: {
                currentUser: null
            }
        });
    });

    it("renders without crashing with currentUser", async () => {
        renderWithContext(<Home />, {
            providerProps: {
                currentUser: testUser
            }
        });
    });

    it("renders links to login and signup pages without currentUser", async () => {
        renderWithContext(<Home />, {
            providerProps: {
                currentUser: null
            }
        });
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        expect(screen.getByText(/Log in/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    });

    it("does not render links to login and signup pages with currentUser", async () => {
        renderWithContext(<Home />, {
            providerProps: {
                currentUser: testUser
            }
        });
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        expect(screen.queryByText(/Log in/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Sign up/i)).not.toBeInTheDocument();
    });

    it("renders welcome message to correct first name with currentUser", async () => {
        renderWithContext(<Home />, {
            providerProps: {
                currentUser: testUser
            }
        });
        expect(screen.getByText(/All the jobs in one, convenient place./i)).toBeInTheDocument();
        const regex = new RegExp(`Welcome back,\\s*${testUser.firstName}\\s*!`, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();

    });

    it('navigates to login when "Log in" link is clicked without user', async () => {
        renderHistoryWithContext(
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<div>Mock Login Page</div>} />
            </Routes>, {
            historyArr: ['/'],
            providerProps: {
                currentUser: null
            }
        });
        const loginLink = screen.getByRole('button', { name: /log in/i });
        await userEvent.click(loginLink);

        expect(screen.getByText(/mock login page/i)).toBeInTheDocument();
    });

    it('navigates to signup when "Sign up" link is clicked without user', async () => {
        renderHistoryWithContext(
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<div>Mock Signup Page</div>} />
            </Routes>, {
            historyArr: ['/'],
            providerProps: {
                currentUser: null
            }
        });
        const signupLink = screen.getByRole('button', { name: /sign up/i });
        await userEvent.click(signupLink);

        expect(screen.getByText(/mock signup page/i)).toBeInTheDocument();
    });
});