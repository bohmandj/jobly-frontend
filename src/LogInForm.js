import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import JoblyContext from './JoblyContext';
import {
    Button,
    Card,
    CardBody,
    Form,
    Input,
    Label
} from "reactstrap";

const LogInForm = () => {
    /* Sign up form to take user info for site registration */

    const { currentUser, login } = useContext(JoblyContext);

    const inputs = [
        "username",
        "password"
    ]

    const INITIAL_STATE = inputs.reduce((obj, input) => {
        obj[input] = "";
        return obj;
    }, {});

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responses = Object.values(formData);
        const isFormComplete = responses.every((response, i) => {
            return response.trim() !== "";
        });
        if (isFormComplete) {
            login(formData);
        } else {
            alert("All fields must be filled in order to register a new user.");
        };
    };

    if (currentUser) {
        return <Navigate to={'/'} />
    };

    return (
        <div className='sign-up-form container col-md-6 col-lg-5 col-xl-4 mx-auto'>
            <h1 className='mt-4'>Log In</h1>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        {inputs.map(input => (
                            <div className='mb-3' key={input}>
                                <Label
                                    className='text-capitalize font-weight-bold'
                                    htmlFor={input}
                                >{input}</Label>
                                <Input
                                    id={input}
                                    type="text"
                                    name={input}
                                    value={formData[input] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <Button name="submit" className='w-100'>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default LogInForm;