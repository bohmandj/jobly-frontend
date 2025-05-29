import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';
import { MemoryRouter } from "react-router-dom";

describe('Loading', () => {
    it("renders without crashing", async () => {
        render(
            <MemoryRouter>
                <Loading />
            </MemoryRouter>
        );
    });

    it("renders Jobly logo and 'loading' text correctly", async () => {
        render(
            <MemoryRouter>
                <Loading />
            </MemoryRouter>
        );
        expect(screen.getByText(/Jobly/i)).toBeInTheDocument();
        expect(screen.getByText(/Loading …/i)).toBeInTheDocument();
    });
});