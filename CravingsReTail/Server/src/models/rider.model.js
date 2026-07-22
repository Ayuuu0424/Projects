import mongoose from "mongoose";

const RiderSchema = mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    vehicleDetails: {
      type: {
        vehicleType: { type: String },
        vehicleNumber: { type: String },
        vehicleModel: { type: String },
        vehicleColor: { type: String },
      },
    },
    documents: {
      type: {
        drivingLicense: { type: String},
        vehicleRegistrationCertificate: { type: String},
        insuranceCertificate: { type: String},
        aadharCard: { type: String},
        panCard: { type: String},
      },
    },
    currentAddress: {
      type: {
        address: { type: String},
        city: { type: String},
        state: { type: String},
        pinCode: { type: String},
        country: { type: String},
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },
    averageRating: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: false },
    financialDetails: {
      type: {
        bankName: { type: String},
        accountNumber: { type: String},
        ifscCode: { type: String},
      },
    },
    currentLocation: {
      type: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },

    totalDeliveries: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Rider = mongoose.model("rider", RiderSchema);

export default Rider;
