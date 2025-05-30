import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    Input
} from "reactstrap";

const SearchBar = ({ currentPageUrl, setSearchParams, setIsLoading }) => {
    /* Sign up form to take user info for site registration */

    const [formData, setFormData] = useState({});
    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // navigate(`${currentPageUrl}?query=${formData.query}`);
        setSearchParams({ 'search': formData.query });
    };

    return (
        <Form className='mt-4' onSubmit={handleSubmit}>
            <div className="d-flex">
                <Input
                    className="flex-grow-1 me-2"
                    id="query"
                    type="text"
                    name="query"
                    placeholder="Enter search term..."
                    value={formData["query"] || ""}
                    onChange={handleChange}
                />
                <Button name="submit" className="d-inline col-3">Search</Button>
            </div>
        </Form>
    )
}

export default SearchBar;