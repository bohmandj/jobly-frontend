import React from "react";
import {
    screen,
    fireEvent
} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import CompanyDetail from "../CompanyDetail";
import JoblyApi from "../api";
import { renderHistoryWithContext, testUser, testCompany } from '../testUtils';

jest.mock('../api.js')

beforeEach(() => {
    // mocking API response
    JoblyApi.getCompany.mockResolvedValue(testCompany);
})

describe("CompanyDetail", () => {
    it("renders without crashing with currentUser", async () => {
        await act(async () => {
            renderHistoryWithContext(
                <CompanyDetail />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        })
    });

    it("renders all company content correctly", async () => {
        await act(async () => {
            renderHistoryWithContext(
                <CompanyDetail />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        })
        expect(screen.getByText(testCompany.name)).toBeInTheDocument();
        expect(screen.getByText(testCompany.description)).toBeInTheDocument();
    })

    it("renders all company's jobs content correctly", async () => {
        await act(async () => {
            renderHistoryWithContext(
                <CompanyDetail />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        })
        // should list all three jobs in JobCards
        expect(screen.getByText(testCompany.jobs[0].title)).toBeInTheDocument();
        expect(screen.getByText(testCompany.jobs[1].title)).toBeInTheDocument();
        expect(screen.getByText(testCompany.jobs[2].title)).toBeInTheDocument();
        // one job id should be in currentUser.applications
        expect(screen.getByRole("button", { name: /applied/i })).toBeInTheDocument();
        // two job ids should not be in currentUser.applications
        expect(screen.getAllByRole("button", { name: /apply/i })[0]).toBeInTheDocument();
    })

    it("renders each company's jobs with title, salary, and equity", async () => {
        await act(async () => {
            renderHistoryWithContext(
                <CompanyDetail />,
                {
                    providerProps: { currentUser: testUser },
                    historyArr: [`/companies/${testCompany.handle}`]
                }
            );
        })
        expect(screen.getByText(testCompany.jobs[0].title)).toBeInTheDocument();
        expect(screen.getByText(`Salary: ${testCompany.jobs[0].salary}`)).toBeInTheDocument();
        expect(screen.getByText(`Equity: ${testCompany.jobs[0].equity}`)).toBeInTheDocument();
    })
})