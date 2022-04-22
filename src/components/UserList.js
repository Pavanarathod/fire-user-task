import React from "react";

const UserList = ({ id, name, email, timestamp, index }) => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-between py-5 px-4 items-center">
        <div className="flex items-center space-x-5">
          <span>{index}</span>
          <h1>{email}</h1>
        </div>
        <h1>{name}</h1>
        <h1>{timestamp}</h1>
        <h1>active</h1>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 text-white px-5 py-2 rounded-md focus:outline-none">
            Update
          </button>
          <button className="bg-red-500 text-white px-5 py-2 rounded-md focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
