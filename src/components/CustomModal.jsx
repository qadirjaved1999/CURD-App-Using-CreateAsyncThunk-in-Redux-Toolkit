import React from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showModal, setShowModal }) => {
  const allUsers = useSelector((state) => state.app.users);
  const singleUser = allUsers.find((user) => user.id === id);

  if (!showModal || !singleUser) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative">
        {/* Header */}
        <div className="w-full flex justify-between items-center bg-gray-800 rounded-t-2xl px-4 py-6">
          <h2 className="text-lg font-semibold text-white">User Profile Details</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-white bg-gray-800 border border-white rounded-md p-1.5"
          >
            <Icon icon="mdi:close" width="22" height="22" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center p-6">
          <img
            src={singleUser.avatar || "https://cdn.pixabay.com/photo/2024/09/16/08/57/ai-generated-9050756_1280.jpg"}
            alt={singleUser.name}
            className="w-40 h-40 object-cover rounded-full"
          />
          <h3 className="mt-4 text-xl font-bold text-gray-800">
            {singleUser.name}
          </h3>
          <span className="mt-1 text-sm px-3 py-1 rounded-full bg-gray-200 text-black">
            {singleUser.role || "Software Engineer"}
          </span>
        </div>

        {/* Contact Section */}
        <div className="px-6">
          <div className="rounded-xl p-6 mb-4 space-y-3 shadow-[0_0_20px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-3">
              <Icon icon="mdi:email-outline" className="text-gray-500 text-2xl" />
              <div>
                <p className="w-fit text-sm text-gray-500">Email</p>
                <p className="text-black font-semibold">{singleUser.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon icon="mdi:phone-outline" className="text-gray-500 text-2xl" />
              <div>
                <p className="w-fit text-sm text-gray-500">Phone</p>
                <p className="text-black font-semibold">{singleUser.phone || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon icon="mdi:map-marker-outline" className="text-gray-500 text-2xl" />
              <div>
                <p className="w-fit text-sm text-gray-500">Location</p>
                <p className="text-black font-semibold">{singleUser.location || "Lahore, Punjab Pakistan"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Info Section */}
        <div className="px-6 pb-6">
          <div className="rounded-xl p-6 flex justify-between shadow-[0_0_20px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-start gap-2">
              <Icon icon="mdi:cake-variant-outline" className="text-gray-500 text-2xl" />
              <div>
                <p className="w-fit text-sm text-gray-500 mt-1">Age</p>
                <p className="text-black font-semibold">{singleUser.age} years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:account-outline" className="text-gray-500 text-2xl mb-5" />
              <div>
                <p className="w-fit text-sm text-gray-500 mt-1">Gender</p>
                <p className="text-black font-semibold">{singleUser.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
