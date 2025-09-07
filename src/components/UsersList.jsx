import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUsers } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import CustomLoader from "./CustomLoader";
import { Icon } from "@iconify/react/dist/iconify.js";

const UsersList = () => {
  // ______________ Local States ______________
  const [filteredData, setFilteredData] = useState([]); // Data after applying search + filter
  const [searchTerm, setSearchTerm] = useState(""); // Search text
  const [filterValue, setFilterValue] = useState("all"); // Gender filter ("all" by default)
  const [id, setId] = useState(null); // Selected user ID for modal
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // ______________ Redux Store Data ______________
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);

  // ______________ Fetch Users on Mount ______________
  useEffect(() => {
    dispatch(showUsers());
  }, [dispatch]);

  // ______________ Apply Search + Gender Filter ______________
  useEffect(() => {
    let result = [...users]; // work directly with users from Redux

    // Apply search filter
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply gender filter
    if (filterValue !== "all") {
      result = result.filter(
        (item) => item.gender.toLowerCase() === filterValue
      );
    }

    setFilteredData(result);
  }, [searchTerm, filterValue, users]);

  // ______________ Handlers ______________
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (value) => setFilterValue(value);

  // ______________ Loader State ______________
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="p-6">
      <div className="w-full">
        {/* ______________ Modal for Viewing User Details ______________ */}
        {showModal && (
          <CustomModal
            id={id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        {/* ______________ Heading ______________ */}
        <h1 className="text-3xl font-bold pb-6">All Users List</h1>

        {/* ______________ Card Container ______________ */}
        <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
          {/* ______________ Filter + Search Section ______________ */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b dark:border-gray-700">
            {/* Gender Filter */}
            <div className="w-full max-w-[20em] flex items-center space-x-4 mb-4 sm:mb-0">
              <select
                id="filter"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-blue-500 focus:border-blue-500 p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filterValue}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 
                           bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* ______________ Table Section ______________ */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Gender
                  </th>
                  <th scope="col" className="w-0 px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                                 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 text-center">{item.id}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4 text-center">{item.email}</td>
                      <td className="px-6 py-4 text-center">{item.password}</td>
                      <td className="px-6 py-4 text-center">{item.phone}</td>
                      <td className="px-6 py-4 text-center">{item.address}</td>
                      <td className="px-6 py-4 text-center">{item.age}</td>
                      <td className="px-6 py-4 text-center">{item.gender}</td>
                      <td className="w-fit flex justify-center gap-2 px-6 py-4 text-center">
                        {/* ______View Button______*/}
                        <button
                          type="button"
                          onClick={() => [setId(item.id), setShowModal(true)]}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Icon icon="mdi:eye" className="text-lg" /> View
                        </button>
                        {/* ______Edit Button______*/}
                        <Link
                          to={`/edit/${item.id}`}
                          className="w-fit flex items-center gap-1 px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                        >
                          <Icon icon="mdi:account-edit" className="text-lg" />
                          Edit
                        </Link>
                        {/* ______Delete Button______*/}
                        <button
                          type="button"
                          onClick={() => dispatch(deleteUser(item.id))}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          <Icon icon="mdi:delete" className="text-lg" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td colSpan="9" className="px-6 py-4 text-center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ______________ Table Info Section ______________ */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t dark:border-gray-700">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredData.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {users.length}
              </span>{" "}
              records
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
