import React from "react";
import {
    render,
    screen,
    fireEvent
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JoblyContext from '../JoblyContext';
import LogInForm from "../LogInForm";
import { renderWithContext, testUser } from '../testUtils';

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

const mockLogin = jest.fn();

describe("LogInForm", () => {
    it("renders without crashing without currentUser", () => {
        renderWithContext(<LogInForm />, {
            providerProps: {
                currentUser: null,
                login: mockLogin
            }
        });
    })

    it("redirects to homepage ('/') with currentUser", () => {
        render(
            <JoblyContext.Provider value={{ currentUser: testUser, login: mockLogin }}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path="/login" element={<LogInForm />} />
                        <Route path="/" element={<div>Mock Home</div>} />
                    </Routes>
                </MemoryRouter>
            </JoblyContext.Provider>
        );

        // If we were redirected, we should now see "Mock Home"
        expect(screen.getByText("Mock Home")).toBeInTheDocument();
    })

    it("renders correct form without currentUser", () => {
        renderWithContext(<LogInForm />, {
            providerProps: {
                currentUser: null,
                login: mockLogin
            }
        });
        expect(screen.getByText(/log in/i)).toBeInTheDocument();
    })

    it("submits form when complete & returns correct data", () => {
        const testLogin = {
            username: "TestName",
            password: "testPassword"
        }

        renderWithContext(<LogInForm />, {
            providerProps: {
                currentUser: null,
                login: mockLogin
            }
        });

        // update inputs to testLogin data
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: testLogin.username } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: testLogin.password } });
        // expect form to submit newly entered data
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(mockLogin).toHaveBeenCalledWith(testLogin);
    })

    it("alerts user if form is incomplete when attempting to submit", () => {
        window.alert = jest.fn();
        renderWithContext(<LogInForm />, {
            providerProps: {
                currentUser: null,
                login: mockLogin
            }
        });

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(window.alert).toHaveBeenCalledWith("All fields must be filled in order to register a new user.");
    })
})