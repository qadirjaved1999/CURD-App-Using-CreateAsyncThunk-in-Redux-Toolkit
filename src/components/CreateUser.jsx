import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const initialUserState = {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        age: "",
        gender: ""
    };

    const [user, setUser] = useState(initialUserState);

    const handleChange = (e) => {
        const { id, value, name, type } = e.target;

        // For radio buttons
        const key = type === "radio" ? name : id;

        setUser({ ...user, [key]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", user);
        dispatch(createUser(user));

       setUser(initialUserState);
       navigate('/read');
    };

    return (
        <div className="py-8">
            <div className="w-full bg-white">
                <h1 className='w-full text-center text-3xl font-semibold px-4 pb-10'>User Registeration Form</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="name"
                                value={user.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="password"
                                value={user.password}
                                onChange={handleChange}
                                type="password"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block"
                                htmlFor="phone"
                            >
                                Phone
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="phone"
                                value={user.phone}
                                onChange={handleChange}
                                type="tel"
                                placeholder="+92 300 1234567"
                            />
                        </div>
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block"
                                htmlFor="address"
                            >
                                Address
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="address"
                                value={user.address}
                                onChange={handleChange}
                                type="text"
                                placeholder="Street, City"
                            />
                        </div>
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block"
                                htmlFor="age"
                            >
                                Age
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="age"
                                max="100"
                                min="1"
                                type="number"
                                value={user.age}
                                onChange={handleChange}
                                placeholder="25"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="w-full text-start text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                        <div className="flex space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={user.gender === "male"}
                                    onChange={handleChange}
                                /> Male
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={user.gender === "female"}
                                    onChange={handleChange}
                                /> Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={user.gender === "other"}
                                    onChange={handleChange}
                                /> Other
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center mt-8">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center"
                            type="submit"
                        >
                            <i className="fas fa-paper-plane mr-2" />
                            Submit Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser