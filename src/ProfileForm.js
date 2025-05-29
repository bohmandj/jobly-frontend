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

const ProfileForm = () => {
    /* Profile form to update user data */

    const { currentUser, updateUser } = useContext(JoblyContext);

    if (!currentUser) {
        return <Navigate to={'/'} />
    }

    const inputs = [
        "firstName",
        "lastName",
        "email",
    ]

    const INITIAL_STATE = inputs.reduce((obj, input) => {
        obj[input] = currentUser[input] || "";
        return obj;
    }, {});

    const addCamelSpace = (str) => {
        // add a space character before any capitalized character
        return str.replace(/([a-z])([A-Z])/g, "$1 $2")
    }

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
            updateUser(formData);
        } else {
            alert("All fields must be filled in order to register a new user.");
        };
    };

    return (
        <div className='profile-form container col-md-6 col-lg-5 col-xl-4 mx-auto'>
            <h1 className='mt-4'>Profile</h1>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <div className='mb-3' key="username">
                            <Label
                                className='font-weight-bold'
                                htmlFor='username'
                            >Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder={currentUser.username}
                                disabled
                                readOnly
                            />
                        </div>
                        {inputs.map(input => (
                            <div className='mb-3' key={input}>
                                <Label
                                    className='text-capitalize font-weight-bold'
                                    htmlFor={input}
                                >{addCamelSpace(input)}</Label>
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

export default ProfileForm;