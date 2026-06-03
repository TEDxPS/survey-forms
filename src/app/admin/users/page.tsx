import { redirect } from "next/navigation";
import { getAdminSession } from "@/libs/adminAuth";
import dbConnect from "@/libs/mongodb";
import AdminUser from "@/models/AdminUser";
import UsersTableClient from "./_components/UsersTableClient";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  await dbConnect();
  const users = await AdminUser.find({}, { passwordHash: 0 }).sort({ createdAt: 1 }).lean();

  const serialised = users.map((u: any) => ({
    id: u._id.toString(),
    username: u.username,
    createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
    isSelf: u._id.toString() === session.userId,
  }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <UsersTableClient users={serialised} />
      </div>
    </div>
  );
}
