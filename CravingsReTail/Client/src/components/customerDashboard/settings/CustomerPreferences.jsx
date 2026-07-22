import React, { useState } from "react";
//import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const CustomerPreferences = ({ customerData, setCustomerData }) => {
  const [editing, setEditing] = useState(false);
  //const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCustomerData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === "checkbox" ? checked : value,
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

      toast.success("Preferences updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update preferences",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-(--base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--secondary) pb-2 mb-3">
        <h3 className="text-sm font-semibold text-(--primary)">Preferences</h3>

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
              onClick={() => setEditing(false)}
              className="bg-(--secondary) text-(--secondary-content) px-3 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">Favourite Cuisine</label>
          <input
            type="text"
            name="favouriteCuisine"
            value={customerData.preferences.favouriteCuisine}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Preferred Payment</label>
          <select
            name="preferredPayment"
            value={customerData.preferences.preferredPayment}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Wallet</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold">Food Preference</label>
          <select
            name="foodPreference"
            value={customerData.preferences.foodPreference}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border border-(--secondary) rounded px-2 py-1"
          >
            <option>Veg</option>
            <option>Non Veg</option>
            <option>Both</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 justify-end">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={customerData.preferences.emailNotifications}
              onChange={handleChange}
              disabled={!editing}
            />
            Email Notifications
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={customerData.preferences.smsNotifications}
              onChange={handleChange}
              disabled={!editing}
            />
            SMS Notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreferences;
