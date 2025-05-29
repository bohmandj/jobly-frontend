import React from 'react';
import { screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { renderWithContext, testUser } from '../testUtils';

const mockLogout = jest.fn();

describe('NavBar', () => {
    it("renders without crashing without currentUser", async () => {
        renderWithContext(<NavBar />, {
            providerProps: {
                currentUser: null,
                logout: mockLogout
            }
        });
    });

    it("renders without crashing with currentUser", async () => {
        renderWithContext(<NavBar />, {
            providerProps: {
                currentUser: testUser,
                logout: mockLogout
            }
        });
    });

    it("renders links to homepage, login and signup pages without currentUser", async () => {
        renderWithContext(<NavBar />, {
            providerProps: {
                currentUser: null,
                logout: mockLogout
            }
        });
        expect(screen.getByText(/Jobly/i)).toBeInTheDocument();
        expect(screen.getByText(/Log in/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    });

    it("renders links to homepage, companies, jobs, profile, and logout pages with currentUser", async () => {
        renderWithContext(<NavBar />, {
            providerProps: {
                currentUser: testUser,
                logout: mockLogout
            }
        });
        expect(screen.getByText(/Jobly/i)).toBeInTheDocument();
        expect(screen.getByText(/companies/i)).toBeInTheDocument();
        expect(screen.getByText(/jobs/i)).toBeInTheDocument();
        expect(screen.getByText(/profile/i)).toBeInTheDocument();
        expect(screen.getByText(/log out/i)).toBeInTheDocument();
    });
});