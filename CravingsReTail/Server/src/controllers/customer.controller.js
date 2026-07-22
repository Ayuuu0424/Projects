import Customer from "../models/customer.model.js";

export const CustomerGetData = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const customerId = req.query.id;

    if (currentUser._id.toString() !== customerId) {
      const error = new Error("Unauthorized Access");
      error.statusCode = 401;
      return next(error);
    }

    const customerData = await Customer.findOne({ customerId });

    if (customerData) {
      return res.status(200).json({
        message: "Customer fetched successfully",
        data: customerData,
      });
    }

    return res.status(200).json({
      message: "No customer data found",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const CustomerUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const data = req.body;

    const existingCustomer = await Customer.findOne({
      customerId: currentUser._id,
    });

    if (!existingCustomer) {
      const newCustomer = await Customer.create({
        customerId: currentUser._id,
        addressBook: [
          {
            name: data.name,
            address: data.address,
            landmark: data.landmark,
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
            country: data.country,
            addressType: data.addressType,
            isDefault: true,
            geoLocation: {
              lat: data.lat,
              lon: data.lon,
            },
          },
        ],

        preferences: {
          favouriteCuisine: data.favouriteCuisine,
          preferredPayment: data.preferredPayment,
          foodPreference: data.foodPreference,
          emailNotifications:
            data.emailNotifications === true ||
            data.emailNotifications === "true",

          smsNotifications:
            data.smsNotifications === true || data.smsNotifications === "true",
        },
      });

      return res.status(201).json({
        message: "Customer profile created successfully",
        data: newCustomer,
      });
    }

    existingCustomer.addressBook = [
      {
        name: data.name,
        address: data.address,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        country: data.country,
        addressType: data.addressType,
        isDefault: true,
        geoLocation: {
          lat: data.lat,
          lon: data.lon,
        },
      },
    ];

    existingCustomer.preferences = {
      favouriteCuisine: data.favouriteCuisine,
      preferredPayment: data.preferredPayment,
      foodPreference: data.foodPreference,
      emailNotifications: data.emailNotifications,
      smsNotifications: data.smsNotifications,
    };

    await existingCustomer.save();

    return res.status(200).json({
      message: "Customer profile updated successfully",
      data: existingCustomer,
    });
  } catch (error) {
    next(error);
  }
};
