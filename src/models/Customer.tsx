import mongoose, { Schema } from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
   
    firstName: {
      type: String,
      required: [true, "Please provide a firstName "],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a lastName "],
    },
  
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a email "],
    },

    phone: {
      type: String,
      required: [true, "Please provide a phone "],
    },
    city: {
      type: String,
      required: [true, "Please provide a city "],
    },
    state: {
      type: String,
      required: [true, "Please provide a state "],
    },
    address: {
      type: String,
      required: [true, "Please provide a address "],
    },
    location: {
      type: String,
      required: [true, "Please provide a location "],
    },
    pincode: {
      type: String,
      required: [true, "Please provide pincode"],
    },
    aadhar: {
      type: String,
      required: [true, "Please provide a aadhar "],
    },
   

    password: {
      type: String,
      required: [true, "Please provide a name "],
      maxlength: [200, "Name cannot be more than 60 characters"],
    },

  
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
