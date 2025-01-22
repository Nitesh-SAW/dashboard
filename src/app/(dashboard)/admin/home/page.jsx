import UserCard from "@/components/UserCard";
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

      <div className="flex justify-between mt-2">
        <UserCard title={"Product"} count={0} />
        <UserCard title={"Projects"} count={0} />
        <UserCard title={"Pending Applications"} count={0} />
        <UserCard title={"Blogs"} count={70} />
      </div>
    </div>
  );
};

export default page;
