import React from "react";
import {
    screen,
    fireEvent
} from "@testing-library/react";
import JobCard from "../JobCard";
import { renderWithContext, testUser, testJobApplied, testJobUnapplied } from '../testUtils';

describe("JobCard", () => {
    it("renders without crashing", () => {
        renderWithContext(
            <JobCard
                job={testJobUnapplied}
                showCompanyName={true}
            />,
            { providerProps: { currentUser: testUser } }
        );
    });

    it("renders all shared content correctly", () => {
        renderWithContext(
            <JobCard
                job={testJobApplied}
                showCompanyName={true}
            />,
            { providerProps: { currentUser: testUser } }
        );
        expect(screen.getByText(testJobApplied.title)).toBeInTheDocument();
        expect(screen.getByText(`Salary: ${testJobApplied.salary}`)).toBeInTheDocument();
        expect(screen.getByText(`Equity: ${testJobApplied.equity}`)).toBeInTheDocument();
    })

    it("renders with company name", () => {
        renderWithContext(
            <JobCard
                job={testJobApplied}
                showCompanyName={true}
            />,
            { providerProps: { currentUser: testUser } }
        );
        expect(screen.getByText(testJobApplied.companyName)).toBeInTheDocument();
    })

    it("renders without company name", () => {
        renderWithContext(
            <JobCard
                job={testJobUnapplied}
                showCompanyName={false}
            />,
            { providerProps: { currentUser: testUser } }
        );
        expect(screen.queryByText(testJobUnapplied.companyName)).not.toBeInTheDocument();
    })

    it("renders 'applied' button when job id is in currentUser's applied arr", () => {
        renderWithContext(
            <JobCard
                job={testJobApplied}
                showCompanyName={true}
            />,
            { providerProps: { currentUser: testUser } }
        );
        expect(screen.getByRole("button", { name: /applied/i })).toBeInTheDocument();
    })

    it("renders 'apply' button when job id is not in currentUser's applied arr", () => {
        renderWithContext(
            <JobCard
                job={testJobUnapplied}
                showCompanyName={false}
            />,
            { providerProps: { currentUser: testUser } }
        );
        expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
    })
})