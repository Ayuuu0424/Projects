import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex text-(--primary) h-[92vh]">
        <div className="w-1/6 border border-pink-500 ">
          <Sidebar />
        </div>
        <div className="w-5/6 border border-purple-500">Content</div>
      </div>
    </>
  );
};

export default UserDashboard;
