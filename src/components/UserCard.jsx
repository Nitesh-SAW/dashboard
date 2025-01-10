import React from "react";

const UserCard = ({ title, count }) => {
  return (
    <div className="bg-white text-black p-6 rounded-sm border shadow-lg w-[20%]  ">
      <h1 className=" ">{title}</h1>
      <p>
        <span className="text-2xl text-red-800">{count}</span>
      </p>
    </div>
  );
};

export default UserCard;
