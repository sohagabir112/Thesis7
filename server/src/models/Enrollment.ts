import mongoose, { Schema, type Document } from "mongoose";

export interface IEnrollment extends Document {
  userId?: mongoose.Types.ObjectId;
  courseName: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status: "pending" | "approved" | "active" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    courseName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "active", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Enrollment = mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);
