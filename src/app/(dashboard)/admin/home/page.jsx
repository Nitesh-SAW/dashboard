import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between m-5 mt-20 ">
        <div className="text-lg font-bold">Dashboard</div>
        <div>Dashboard</div>
      </div>
      <hr className="mt-5" />
      <div className="mt-5 pl-7">
        Good Morning <span className="text-2xl ">Santosh!</span> <br />
        <span className="text-purple-900">
          {" "}
          Here’s what’s happening with your site today.
        </span>
      </div>

      <div className="flex justify-between p-5 ">
        <div className="bg-white text-black p-6 rounded-sm border shadow-lg w-[23%]  ">
          <h1 className=" ">Products</h1>
          <p>
            <span className="text-2xl text-red-800">0</span>
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-sm border shadow-lg w-[23%] ">
          <h1 className=" ">Projects</h1>
          <p>
            <span className="text-2xl text-red-800">0</span>
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-sm border shadow-lg w-[23%] ">
          <h1 className=" ">Pending Applications</h1>
          <p>
            <span className="text-2xl text-red-800">0</span>
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-sm border shadow-lg  w-[23%] ">
          <h1 className=" ">Blogs</h1>
          <p>
            <span className="text-2xl text-red-800">0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;