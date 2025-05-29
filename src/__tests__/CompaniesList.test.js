import React from "react";
import {
    screen,
    fireEvent
} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import CompaniesList from "../CompaniesList";
import JoblyApi from "../api";
import {
    renderWithContext,
    renderHistoryWithContext,
    testUser,
    testCompaniesList
} from '../testUtils';

jest.mock('../api.js')

beforeEach(() => {
    // mocking API response
    JoblyApi.getAllCompanies.mockResolvedValue(testCompaniesList);
})

describe("CompaniesList", () => {
    it("renders without crashing with currentUser", async () => {
        await act(async () => {
            renderWithContext(
                <CompaniesList />,
                { providerProps: { currentUser: testUser } }
            );
        })
    });

    it("renders the search bar component", async () => {
        await act(async () => {
            renderWithContext(
                <CompaniesList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByPlaceholderText(/enter search term.../i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    })

    it("renders all companies", async () => {
        await act(async () => {
            renderWithContext(
                <CompaniesList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByText(testCompaniesList[0].name)).toBeInTheDocument();
        expect(screen.getByText(testCompaniesList[1].name)).toBeInTheDocument();
        expect(screen.getByText(testCompaniesList[2].name)).toBeInTheDocument();
    })

    it("renders each company with name, and description", async () => {
        await act(async () => {
            renderWithContext(
                <CompaniesList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByText(testCompaniesList[0].name)).toBeInTheDocument();
        expect(screen.getByText(testCompaniesList[0].description)).toBeInTheDocument();
    })

    it('navigates to company page when a company is clicked', async () => {
        await act(async () => {
            renderHistoryWithContext(
                <Routes>
                    <Route path="/companies" element={<CompaniesList />} />
                    <Route path={`/companies/${testCompaniesList[0].handle}`} element={<div>Mock Company Page</div>} />
                </Routes>, {
                historyArr: ['/companies'],
                providerProps: {
                    currentUser: testUser
                }
            });
        });
        const companyLink = screen.getAllByRole('link')[0];
        await userEvent.click(companyLink);

        expect(screen.getByText(/mock company page/i)).toBeInTheDocument();
    });
})