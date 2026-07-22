import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
//import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";

const CustomerAddress = ({ customerData, setCustomerData }) => {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCustomerData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      await api.post("/customer/update-profile", {
        name: customerData.address.houseNo,
        address: customerData.address.street,
        landmark: customerData.address.landmark,
        city: customerData.address.city,
        state: customerData.address.state,
        country: customerData.address.country,
        pinCode: customerData.address.pincode,
        addressType: "home",
        lat: "",
        lon: "",

        favouriteCuisine: customerData.preferences.favouriteCuisine,
        preferredPayment: customerData.preferences.preferredPayment,
        foodPreference: customerData.preferences.foodPreference,
        emailNotifications: customerData.preferences.emailNotifications,
        smsNotifications: customerData.preferences.smsNotifications,
      });

      toast.success("Customer settings updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update customer settings",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-(--base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--secondary) pb-2 mb-3">
        <h3 className="text-sm font-semibold text-(--primary)">
          Address Information
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
          <label className="text-xs font-semibold">House No.</label>
          <input
            type="text"
            name="houseNo"
            value={customerData.address.houseNo}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Street</label>
          <input
            type="text"
            name="street"
            value={customerData.address.street}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={customerData.address.landmark}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={customerData.address.city}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">State</label>
          <input
            type="text"
            name="state"
            value={customerData.address.state}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Country</label>
          <input
            type="text"
            name="country"
            value={customerData.address.country}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={customerData.address.pincode}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAddress;
