import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import {updateUserRecord} from "../features/userDetailSlice"

const UpdateUser = () => {
     
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [updateUser, setUpdateUser] = useState(null);
    const { id } = useParams();
    console.log("you get id from url using params=====>>>>> ", id);

    const { users, loading } = useSelector((state) => state.app);
    console.log("get users from store === > ", users)

    useEffect(() => {
        if (id && users.length > 0) {
            const getSpecificUser = users.filter((user) => user.id == id);
            console.log("updated user here =>>>>>>>", getSpecificUser);
            setUpdateUser(getSpecificUser[0])
        }
        console.log("=========>>>>>>updated state of updateUser", updateUser)
    }, []);

    const updatedData = (e) => {
        const { name, value } = e.target;
        console.log(name, ":", value);
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }
    console.log("updateUser", updateUser)

    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUserRecord(updateUser))
        navigate("/read");

    }
    return (
        <div className="py-8">
            <div className="w-full bg-white">
                <h1 className='w-full text-center text-3xl font-semibold px-4 pb-10'>Edit User Data</h1>
                <form className="w-full" onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label
                                className="w-full text-start text-sm font-medium text-gray-700 mb-2 block" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="name"
                                value={updateUser?.name || ""}
                                onChange={updatedData}
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
                                name="email"
                                value={updateUser?.email || ""}
                                onChange={updatedData}
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
                                name="password"
                                value={updateUser?.password || ""}
                                onChange={updatedData}
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
                                name="phone"
                                value={updateUser?.phone || ""}
                                onChange={updatedData}
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
                                name="address"
                                value={updateUser?.address || ""}
                                onChange={updatedData}
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
                                name="age"
                                max="100"
                                min="1"
                                type="number"
                                value={updateUser?.age || ""}
                                onChange={updatedData}
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
                                    checked={updateUser?.gender === "male" || ""}
                                    onChange={updatedData}
                                /> Male
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={updateUser?.gender === "female" || ""}
                                    onChange={updatedData}
                                /> Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={updateUser?.gender === "other" || ""}
                                    onChange={updatedData}
                                /> Other
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-center mt-8">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center"
                            type="submit"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser