import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, showUsers } from '../features/userDetailSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';

const UsersList = () => {
    // Sample data array
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterValue, setFilterValue] = useState('all');
    const [id, setId] = useState();
    const [showModal, setShowModal] = useState(false)

    const {users, loading} = useSelector((state) => state.app)
    console.log("users =======>>> ",users)

    // fetch from API
    useEffect(() => {
        dispatch(showUsers()); 
    }, [dispatch]);

    // Filter data based on search term and filter value
    useEffect(() => {

        let result = data;

        // Apply search filter
        if (searchTerm) {
            result = result.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Apply gender filter
        if (filterValue !== 'all') {
            result = result.filter(item => item.gender.toLowerCase() === filterValue);
        }

        setFilteredData(result);
    }, [searchTerm, filterValue, data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (value) => {
        setFilterValue(value);
    };

    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    if(loading){
        return(<h2>Loading......</h2>)
    }

    return (
        <div className="pt-6">
            <div className="w-full">
                {showModal ? <CustomModal id={id} showModal={showModal} setShowModal={setShowModal}/> : ""}
                <h1 className='text-3xl font-bold pb-6'>
                    All Users List
                </h1>
                <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b dark:border-gray-700">
                        {/* Filter dropdown */}
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <select
                                id="filter"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={filterValue}
                                onChange={(e) => handleFilterChange(e.target.value)}
                            >
                                <option value="all">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Search input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for items"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Password</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">Address</th>
                                    <th scope="col" className="px-6 py-3">Age</th>
                                    <th scope="col" className="px-6 py-3">Gender</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((item) => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{item.id}</td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">{item.email}</td>
                                            <td className="px-6 py-4">{item.password}</td>
                                            <td className="px-6 py-4">{item.phone}</td>
                                            <td className="px-6 py-4">{item.address}</td>
                                            <td className="px-6 py-4">{item.age}</td>
                                            <td className="px-6 py-4">{item.gender}</td>
                                            <td className="px-6 py-4">
                                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3" onClick={() => [setId(item.id), setShowModal(true)]}>
                                                    View
                                                </button>
                                                <Link to={`/edit/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">
                                                    Edit
                                                </Link>
                                                <button
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    onClick={() => dispatch(deleteUser(item.id))}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td colSpan="9" className="px-6 py-4 text-center">No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table info */}
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t dark:border-gray-700">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span> records
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;