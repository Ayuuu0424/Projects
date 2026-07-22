console.log("CustomerSetting Rendered");

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import CustomerInformation from "./settings/CustomerInformation";
import CustomerAddress from "./settings/CustomerAddress";
import CustomerPreferences from "./settings/CustomerPreferences";

const CustomerSetting = () => {
  const [activeTab, setActiveTab] = useState("information");

  const { user } = useAuth();

  const [customerData, setCustomerData] = useState({
    address: {
      houseNo: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },

    preferences: {
      favouriteCuisine: "",
      preferredPayment: "Cash",
      foodPreference: "Veg",
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  useEffect(() => {
    fetchCustomerData();
  }, [user]);

  const fetchCustomerData = async () => {
    if (!user?._id) return;

    try {
      const response = await api.get(
        `/customer/get-customer-data?id=${user._id}`,
      );

      const data = response.data.data;

      if (!data || Object.keys(data).length === 0) return;

      const address = data.addressBook?.[0];

      setCustomerData({
        address: {
          houseNo: address?.name || "",
          street: address?.address || "",
          landmark: address?.landmark || "",
          city: address?.city || "",
          state: address?.state || "",
          country: address?.country || "",
          pincode: address?.pinCode || "",
        },

        preferences: {
          favouriteCuisine: data.preferences?.favouriteCuisine || "",
          preferredPayment: data.preferences?.preferredPayment || "Cash",
          foodPreference: data.preferences?.foodPreference || "Veg",
          emailNotifications: data.preferences?.emailNotifications ?? true,
          smsNotifications: data.preferences?.smsNotifications ?? false,
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch customer data",
      );
    }
  };

  return (
    <div className="bg-(--base-100) rounded-lg h-full p-2">
      <div className="flex border-b border-(--secondary) mb-4">
        {["information", "address", "preferences"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 capitalize transition-all ${
              activeTab === tab
                ? "border-b-2 border-(--primary) text-(--primary) font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "information" && <CustomerInformation />}
      {activeTab === "address" && (
        <CustomerAddress
          customerData={customerData}
          setCustomerData={setCustomerData}
        />
      )}

      {activeTab === "preferences" && (
        <CustomerPreferences
          customerData={customerData}
          setCustomerData={setCustomerData}
        />
      )}
    </div>
  );
};

export default CustomerSetting;
