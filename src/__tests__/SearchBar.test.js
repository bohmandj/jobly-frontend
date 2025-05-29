import React from "react";
import {
    render,
    screen,
    fireEvent
} from "@testing-library/react";
import SearchBar from "../SearchBar";
import { testUser } from '../testUtils';

jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn(),
        useHistory: () => ({
            push: jest.fn()
        }),
    };
});

const mockSearch = jest.fn();
const mockSetLoading = jest.fn();

describe("SearchBar", () => {
    it("renders without crashing", () => {
        render(
            <SearchBar
                apiSearchFn={mockSearch}
                setIsLoading={mockSetLoading}
            />
        )
    });

    it("renders correct form", () => {
        render(
            <SearchBar
                apiSearchFn={mockSearch}
                setIsLoading={mockSetLoading}
            />
        )
        expect(screen.getByPlaceholderText(/enter search term.../i)).toBeInTheDocument();
    })

    it("submits form when complete & returns correct data", () => {
        const testQuery = "test search term"

        render(
            <SearchBar
                apiSearchFn={mockSearch}
                setIsLoading={mockSetLoading}
            />
        )

        // update inputs to testQuery data
        fireEvent.change(screen.getByPlaceholderText(/enter search term.../i), { target: { value: testQuery } });
        // expect form to submit newly entered data
        fireEvent.click(screen.getByRole("button", { name: /search/i }));
        expect(mockSearch).toHaveBeenCalledWith(testQuery);
    })
})