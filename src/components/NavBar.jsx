import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"; // Import Iconify for icons

const NavBar = () => {
  // ______________ Get users from Redux store ______________
  const allUsers = useSelector((state) => state.app.users);

  // ______________ Define navigation links as an array of objects ______________
  const navLinks = [
    {
      label: "Create New User",
      path: "/",
      icon: "mdi:user-add", 
      extra: null,
    },
    {
      label: "Show All Users List",
      path: "/read",
      icon: "mdi:account-group", 
      extra: `(${allUsers.length})`, 
    },
    {
      label: "Services",
      path: "#",
      icon: "mdi:cog-outline", 
      extra: null,
    },
  ];

  return (
    <>
      {/* ______________ Top Navigation Bar container ______________ */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
          
          {/* ______________ Left side: Logo Section ______________ */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* ______________ Logo Image ______________ */}
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            {/* ______________ Logo Text ______________ */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              RTK
            </span>
          </a>

          {/* ______________ Right Section (Search + Links) ______________ */}
          <div className="w-full max-w-[60%] flex justify-end items-center gap-20">
            
            {/* ______________ Search Section (mobile + desktop) ______________ */}
            <div className="w-full max-w-md flex justify-end md:order-2">

              {/* ______________ Mobile Search Button (visible only on mobile) ______________ */}
              <button
                type="button"
                data-collapse-toggle="navbar-search"
                aria-controls="navbar-search"
                aria-expanded="false"
                className="w-full max-w-2xl md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
              >
                {/* ______________ Search icon (magnifying glass) ______________ */}
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>

              {/* ______________ Desktop Search Input ______________ */}
              <div className="w-full relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  {/* ______________ Search icon inside input field ______________ */}
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                {/* ______________ Search input field ______________ */}
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>

              {/* ______________ Mobile Menu Toggle Button (hamburger icon) ______________ */}
              <button
                data-collapse-toggle="navbar-search"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-search"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            {/* ______________ Navigation Links Section ______________ */}
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-search"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                
                {/* ______________ Loop through navLinks array and render each li ______________ */}
                {navLinks.map((link, index) => (
                  <li key={index}>
                    {link.path.startsWith("/") ? (
                      <Link
                        to={link.path}
                        className="flex items-center gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        <Icon icon={link.icon} width="18" height="18" />
                        {link.label} {link.extra}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        className="flex items-center gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        <Icon icon={link.icon} width="18" height="18" />
                        {link.label} {link.extra}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar; 
