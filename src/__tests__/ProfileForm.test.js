import React from "react";
import {
    render,
    screen,
    fireEvent
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JoblyContext from '../JoblyContext';
import ProfileForm from "../ProfileForm";
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

const mockUpdateUser = jest.fn();

describe("ProfileForm", () => {
    it("renders without crashing with currentUser", () => {
        renderWithContext(<ProfileForm />, {
            providerProps: {
                currentUser: testUser,
                updateUser: mockUpdateUser
            }
        });
    })

    it("redirects to homepage ('/') without currentUser", () => {
        render(
            <JoblyContext.Provider value={{ currentUser: null, updateUser: mockUpdateUser }}>
                <MemoryRouter initialEntries={["/profile"]}>
                    <Routes>
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path="/" element={<div>Mock Home</div>} />
                    </Routes>
                </MemoryRouter>
            </JoblyContext.Provider>
        );

        // If we were redirected, we should now see "Mock Home"
        expect(screen.getByText("Mock Home")).toBeInTheDocument();
    })

    it("renders correct form with currentUser", () => {
        renderWithContext(<ProfileForm />, {
            providerProps: {
                currentUser: testUser,
                updateUser: mockUpdateUser
            }
        });
        expect(screen.getByText(/profile/i)).toBeInTheDocument();
    })

    it("auto-fills form inputs with correct data from currentUser", () => {
        renderWithContext(<ProfileForm />, {
            providerProps: {
                currentUser: testUser,
                updateUser: mockUpdateUser
            }
        });
        expect(screen.getByLabelText(/first name/i)).toHaveValue(testUser.firstName);
        expect(screen.getByLabelText(/last name/i)).toHaveValue(testUser.lastName);
        expect(screen.getByLabelText(/email/i)).toHaveValue(testUser.email);
    })

    it("submits form when complete & returns correct data", () => {
        const newTestUser = {
            firstName: "newTest",
            lastName: "newUser",
            email: "test@test.com"
        }

        renderWithContext(<ProfileForm />, {
            providerProps: {
                currentUser: testUser,
                updateUser: mockUpdateUser
            }
        });

        // update inputs to newTestUser data
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: newTestUser.firstName } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: newTestUser.lastName } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: newTestUser.email } });
        // expect form to submit newly entered data
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(mockUpdateUser).toHaveBeenCalledWith(newTestUser);
    })

    it("alerts user if form is incomplete when attempting to submit", () => {
        window.alert = jest.fn();
        renderWithContext(<ProfileForm />, {
            providerProps: {
                currentUser: testUser,
                updateUser: mockUpdateUser
            }
        });

        // remove auto-filled input value
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "" } });
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(window.alert).toHaveBeenCalledWith("All fields must be filled in order to register a new user.");
    })
})