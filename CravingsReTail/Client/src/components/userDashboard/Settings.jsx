import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();

  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      <div>Welcome Back!! {user.fullName}</div>
      <div>Welcome Back!! {user.email}</div>
      <div>Welcome Back!! {user.phone}</div>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={user.photo} alt="" className="w-full h-full object-cover" />
      </div>

      <div>
        <div>user.fullname</div>
        <div>user.email</div>
        <div>user.phone</div>
      </div>

    </>
  );
};

export default Settings;
