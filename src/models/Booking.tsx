import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    booking_Name: {
      type: String,
      required: [true, "Please provide a firstName "],
    },
 
  
   
   
  
   
    drone_shot_id: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      required: [true, "Please provide pincode"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location "],
    },

    city: {
      type: String,
      required: [true, "Please provide a city "],
    },
    state: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: [true, "Please provide a address "],
    },
 
 
    latitude: {
      type: String,
      required: [true, "Please provide a latitude "],
    },
    longitude: {
      type: String,
      required: [true, "Please provide a longitude "],
    },
 
   
  
  
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
