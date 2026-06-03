import mongoose from "mongoose";

export interface IAdminUser {
  _id: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { collection: "admin_users", timestamps: true }
);

const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);

export default AdminUser;
