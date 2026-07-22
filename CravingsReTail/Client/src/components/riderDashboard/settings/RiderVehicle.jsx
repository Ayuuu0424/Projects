import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
//import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";

const RiderVehicle = ({ riderData, setRiderData }) => {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setRiderData((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      await api.post("/rider/update-profile", {
        vehicleType: riderData.vehicle.vehicleType,
        vehicleNumber: riderData.vehicle.vehicleNumber,
        vehicleModel: riderData.vehicle.vehicleModel,
        vehicleColor: riderData.vehicle.vehicleColor,

        drivingLicense: riderData.documents.drivingLicense,
        vehicleRegistrationCertificate:
          riderData.documents.vehicleRegistrationCertificate,
        insuranceCertificate: riderData.documents.insuranceCertificate,
        aadharCard: riderData.documents.aadharCard,
        panCard: riderData.documents.panCard,

        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",

        bankName: "",
        accountNumber: "",
        ifscCode: "",

        lat: "",
        lon: "",
      });

      toast.success("Vehicle details updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update vehicle details",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-(--base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--secondary) pb-2 mb-3">
        <h3 className="text-sm font-semibold text-(--primary)">
          Vehicle Information
        </h3>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-(--primary) text-(--primary-content) px-2 py-1 rounded text-xs"
          >
            <MdEdit /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-(--primary) text-(--primary-content) px-3 py-1 rounded text-xs"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setEditing(false);
              }}
              className="bg-(--secondary) text-(--secondary-content) px-3 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold">Vehicle Type</label>
          <input
            type="text"
            name="vehicleType"
            value={riderData.vehicle.vehicleType}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold"><label>Vehicle Number</label></label>
          <input
            type="text"
            name="vehicleNumber"
            value={riderData.vehicle.vehicleNumber}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold"><label>Vehicle Model</label></label>
          <input
            type="text"
            name="vehicleModel"
            value={riderData.vehicle.vehicleModel}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold"><label>Vehicle Color</label></label>
          <input
            type="text"
            name="vehicleColor"
            value={riderData.vehicle.vehicleColor}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default RiderVehicle;
