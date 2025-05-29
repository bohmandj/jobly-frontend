import React from "react";
import {
    screen,
    fireEvent
} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import JobsList from "../JobsList";
import JoblyApi from "../api";
import { renderWithContext, testUser, testJobsList } from '../testUtils';

jest.mock('../api.js')

beforeEach(() => {
    // mocking API response
    JoblyApi.getAllJobs.mockResolvedValue(testJobsList);
})

describe("JobsList", () => {
    it("renders without crashing with currentUser", async () => {
        await act(async () => {
            renderWithContext(
                <JobsList />,
                { providerProps: { currentUser: testUser } }
            );
        })
    });

    it("renders the search bar component", async () => {
        await act(async () => {
            renderWithContext(
                <JobsList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByPlaceholderText(/enter search term.../i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    })

    it("renders all jobs", async () => {
        await act(async () => {
            renderWithContext(
                <JobsList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByText(testJobsList[0].title)).toBeInTheDocument();
        expect(screen.getByText(testJobsList[1].title)).toBeInTheDocument();
        expect(screen.getByText(testJobsList[2].title)).toBeInTheDocument();
    })

    it("renders each job with title, company name, salary, equity, and apply/applied button", async () => {
        await act(async () => {
            renderWithContext(
                <JobsList />,
                { providerProps: { currentUser: testUser } }
            );
        })
        expect(screen.getByText(testJobsList[0].title)).toBeInTheDocument();
        expect(screen.getByText(testJobsList[0].companyName)).toBeInTheDocument();
        expect(screen.getByText(`Salary: ${testJobsList[0].salary}`)).toBeInTheDocument();
        expect(screen.getByText(`Equity: ${testJobsList[0].equity}`)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /applied/i })).toBeInTheDocument();
    })
})