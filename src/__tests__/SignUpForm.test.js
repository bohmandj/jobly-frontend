import React from "react";
import {
    render,
    screen,
    fireEvent
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JoblyContext from '../JoblyContext';
import SignUpForm from "../SignUpForm";
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

const mockSignup = jest.fn();

describe("SignUpForm", () => {
    it("renders without crashing without currentUser", () => {
        renderWithContext(<SignUpForm />, {
            providerProps: {
                currentUser: null,
                register: mockSignup
            }
        });
    })

    it("redirects to homepage ('/') with currentUser", () => {
        render(
            <JoblyContext.Provider value={{ currentUser: testUser, register: mockSignup }}>
                <MemoryRouter initialEntries={["/signup"]}>
                    <Routes>
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/" element={<div>Mock Home</div>} />
                    </Routes>
                </MemoryRouter>
            </JoblyContext.Provider>
        );

        // If we were redirected, we should now see "Mock Home"
        expect(screen.getByText("Mock Home")).toBeInTheDocument();
    })

    it("renders correct form without currentUser", () => {
        renderWithContext(<SignUpForm />, {
            providerProps: {
                currentUser: null,
                register: mockSignup
            }
        });
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    })

    it("submits form when complete & returns correct data", () => {
        const testSignup = {
            username: "TestName",
            password: "testPassword",
            firstName: "newTest",
            lastName: "newUser",
            email: "test@test.com"
        }

        renderWithContext(<SignUpForm />, {
            providerProps: {
                currentUser: null,
                register: mockSignup
            }
        });

        // update inputs to testSignup data
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: testSignup.username } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: testSignup.password } });
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: testSignup.firstName } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: testSignup.lastName } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: testSignup.email } });
        // expect form to submit newly entered data
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(mockSignup).toHaveBeenCalledWith(testSignup);
    })

    it("alerts user if form is incomplete when attempting to submit", () => {
        window.alert = jest.fn();
        renderWithContext(<SignUpForm />, {
            providerProps: {
                currentUser: null,
                register: mockSignup
            }
        });

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(window.alert).toHaveBeenCalledWith("All fields must be filled in order to register a new user.");
    })
})