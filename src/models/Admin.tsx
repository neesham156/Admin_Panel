import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a name for this admin."],
      maxlength: [200, "Name cannot be more than 60 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
