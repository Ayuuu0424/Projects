import Rider from "../models/rider.model.js";

export const RiderGetData = async (req, res, next) => {
  try {
    const { id } = req.query;

    const rider = await Rider.findOne({ riderId: id });

    if (rider) {
      return res.status(200).json({
        success: true,
        rider,
      });
    }

    return res.status(200).json({
      success: true,
      rider: {},
    });
  } catch (error) {
    next(error);
  }
};

export const RiderUpdateProfile = async (req, res, next) => {
  try {
    const {
      vehicleType,
      vehicleNumber,
      vehicleModel,
      vehicleColor,

      drivingLicense,
      vehicleRegistrationCertificate,
      insuranceCertificate,
      aadharCard,
      panCard,

      address,
      city,
      state,
      pinCode,
      country,

      bankName,
      accountNumber,
      ifscCode,

      lat,
      lon,
    } = req.body;

    // const rider = await Rider.findOne({ riderId: req.user._id });

    // if (!rider) {
    //   const error = new Error("Rider not found");
    //   error.statusCode = 404;
    //   return next(error);
    // }
    const rider = await Rider.findOne({ riderId: req.user._id });

    if (!rider) {
      rider = await Rider.create({
        riderId: req.user._id,
      });
    }

    rider.vehicleDetails = {
      vehicleType,
      vehicleNumber,
      vehicleModel,
      vehicleColor,
    };

    rider.documents = {
      drivingLicense,
      vehicleRegistrationCertificate,
      insuranceCertificate,
      aadharCard,
      panCard,
    };

    rider.currentAddress = {
      address,
      city,
      state,
      pinCode,
      country,
    };

    rider.financialDetails = {
      bankName,
      accountNumber,
      ifscCode,
    };

    rider.currentLocation = {
      lat,
      lon,
    };

    await rider.save();

    res.status(200).json({
      success: true,
      message: "Rider profile updated successfully",
      rider,
    });
  } catch (error) {
    next(error);
  }
};
