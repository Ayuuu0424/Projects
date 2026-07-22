// import React, { useState, useEffect } from "react";
// import { MdEdit } from "react-icons/md";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../config/api.config.js";
// import toast from "react-hot-toast";
// import { MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
// import PasswordChangeModal from "../commonModals/PasswordChangeModal";

// const RiderSetting = () => {
//   const { user, setUser } = useAuth();
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profilePic, setProfilePic] = useState(null);
//   const [profilePicPreview, setProfilePicPreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
//     useState(false);

//   const [formData, setFormData] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//   });

//   // Profile handlers
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setIsLoading(true);

//       const payload = new FormData();
//       payload.append("fullName", formData.fullName);
//       payload.append("email", formData.email.toLowerCase());
//       payload.append("phone", formData.phone);

//       payload.append("displayPic", profilePic);

//       const response = await api.put(`/user/edit-profile`, payload);

//       setUser(response.data.data);
//       sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));

//       setEditingProfile(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancelProfile = () => {
//     setFormData({
//       fullName: user.fullName,
//       email: user.email,
//       phone: user.phone,
//     });
//     setProfilePicPreview(null);
//     setEditingProfile(false);
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePicPreview(URL.createObjectURL(file));
//     setProfilePic(file);
//   };

//   return (
//     <>
//       <div className="overflow-y-auto h-full p-6 space-y-6">
//         {/* User Profile Section */}
//         <div className="bg-(--base-200) rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Profile Information</h3>
//             {!editingProfile ? (
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setEditingProfile(true)}
//                   className="flex items-center gap-2 bg-(--primary) text-(--primary-content) px-3 py-1 rounded text-sm"
//                 >
//                   <MdEdit /> Edit
//                 </button>
//                 <button
//                   onClick={() => setIsPasswordChangeModalOpen(true)}
//                   className="flex items-center gap-2 border border-(--primary) text-(--primary) px-3 py-1 rounded text-sm hover:bg-(--primary) hover:text-(--primary-content)"
//                 >
//                   <MdOutlineLockReset /> Change Password
//                 </button>
//               </div>
//             ) : (
//               <div className="flex gap-2 justify-end">
//                 <button
//                   onClick={handleSaveProfile}
//                   className="flex items-center gap-2 bg-(--primary) text-(--primary-content) px-3 py-1 rounded text-sm"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button
//                   onClick={handleCancelProfile}
//                   className="flex items-center gap-2 bg-(--secondary) text-(--secondary-content) px-3 py-1 rounded text-sm"
//                   disabled={isLoading}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             <div className="flex items-center gap-6">
//               <div className="relative">
//                 <div className="w-36 h-36">
//                   <img
//                     src={profilePicPreview || user.photo.url}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover border-2 border-(--primary)"
//                   />
//                 </div>

//                 {editingProfile && (
//                   <div
//                     className="absolute cursor-pointer bottom-1 right-1 border p-2 rounded-full w-fit bg-(--base-200)"
//                     title="Change Photo"
//                   >
//                     <label htmlFor="profilePic" className="cursor-pointer">
//                       <MdOutlineAddAPhoto className="text-xl" />
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       name="profilePic"
//                       id="profilePic"
//                       className="hidden"
//                       onChange={handleProfilePicChange}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-4 w-full">
//                 <div className="grid grid-cols-5 gap-2 justify-center items-center">
//                   <label className="block text-sm font-semibold mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleProfileChange}
//                     className={`w-full px-3 py-2 border ${editingProfile ? "border-(--secondary)" : "border-transparent"} rounded col-span-4`}
//                     disabled={!editingProfile}
//                   />

//                   <label className="block text-sm font-semibold mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleProfileChange}
//                     className={`w-full px-3 py-2 border ${editingProfile ? "border-(--secondary) text-(--secondary) disabled:bg-(--secondary)/50 cursor-not-allowed" : "border-transparent"} rounded col-span-4`}
//                     disabled
//                   />

//                   <label className="block text-sm font-semibold mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleProfileChange}
//                     className={`w-full px-3 py-2 border ${editingProfile ? "border-(--secondary)" : "border-transparent"} rounded col-span-4`}
//                     disabled={!editingProfile}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isPasswordChangeModalOpen && (
//         <PasswordChangeModal
//           open={isPasswordChangeModalOpen}
//           onClose={() => setIsPasswordChangeModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default RiderSetting;

import React, { useState, useEffect } from "react";
import RiderInformation from "./settings/RiderInformation";
import RiderVehicle from "./settings/RiderVehicle";
import RiderDocuments from "./settings/RiderDocuments";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";

const RiderSetting = () => {
  const [activeTab, setActiveTab] = useState("information");

  const { user } = useAuth();

  const [riderData, setRiderData] = useState({
    vehicle: {
      vehicleType: "",
      vehicleNumber: "",
      vehicleModel: "",
      vehicleColor: "",
    },

    documents: {
      drivingLicense: "",
      vehicleRegistrationCertificate: "",
      insuranceCertificate: "",
      aadharCard: "",
      panCard: "",
    },
  });

  const fetchRiderData = async () => {
    try {
      const response = await api.get(`/rider/get-rider-data?id=${user._id}`);

      const rider = response.data.rider;

      setRiderData({
        vehicle: {
          vehicleType: rider.vehicleDetails?.vehicleType || "",
          vehicleNumber: rider.vehicleDetails?.vehicleNumber || "",
          vehicleModel: rider.vehicleDetails?.vehicleModel || "",
          vehicleColor: rider.vehicleDetails?.vehicleColor || "",
        },

        documents: {
          drivingLicense: rider.documents?.drivingLicense || "",
          vehicleRegistrationCertificate:
            rider.documents?.vehicleRegistrationCertificate || "",
          insuranceCertificate: rider.documents?.insuranceCertificate || "",
          aadharCard: rider.documents?.aadharCard || "",
          panCard: rider.documents?.panCard || "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRiderData();
    }
  }, [user]);

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          className={`pb-2 ${
            activeTab === "information"
              ? "border-b-2 border-(--color-primary) font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("information")}
        >
          Information
        </button>

        <button
          className={`pb-2 ${
            activeTab === "vehicle"
              ? "border-b-2 border-(--color-primary) font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("vehicle")}
        >
          Vehicle
        </button>

        <button
          className={`pb-2 ${
            activeTab === "documents"
              ? "border-b-2 border-(--color-primary) font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>

      {activeTab === "information" && <RiderInformation />}
      {activeTab === "vehicle" && (
        <RiderVehicle riderData={riderData} setRiderData={setRiderData} />
      )}
      {activeTab === "documents" && (
        <RiderDocuments riderData={riderData} setRiderData={setRiderData} />
      )}
    </>
  );
};

export default RiderSetting;
