"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserRow {
  id: string;
  username: string;
  createdAt: string;
  isSelf: boolean;
}

const inputCls =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500";

export default function UsersTableClient({ users }: { users: UserRow[] }) {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createError, setCreateError] = useState("");
  const [changePwId, setChangePwId] = useState<string | null>(null);
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");

  async function handleCreate() {
    setCreateError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });
    const data = await res.json();
    if (!res.ok) { setCreateError(data.error); return; }
    setShowCreate(false); setNewUsername(""); setNewPassword("");
    router.refresh();
  }

  async function handleDelete(id: string, username: string) {
    if (!confirm(`Delete user "${username}"?`)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    router.refresh();
  }

  async function handleChangePassword(id: string) {
    setPwError("");
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPw }),
    });
    const data = await res.json();
    if (!res.ok) { setPwError(data.error); return; }
    setChangePwId(null); setNewPw("");
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + Add User
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">New User</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputCls} />
            </div>
            {createError && <p className="text-red-600 text-sm">{createError}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowCreate(false); setCreateError(""); }} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Change password modal */}
      {changePwId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">Change Password</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputCls} />
            </div>
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => { setChangePwId(null); setPwError(""); }} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={() => handleChangePassword(changePwId)} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-5 py-3 font-medium text-gray-600">Username</th>
            <th className="text-left px-5 py-3 font-medium text-gray-600">Created</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="px-5 py-3 font-medium text-gray-900">
                {u.username} {u.isSelf && <span className="text-xs text-gray-400">(you)</span>}
              </td>
              <td className="px-5 py-3 text-gray-500">{u.createdAt}</td>
              <td className="px-5 py-3 text-right space-x-3">
                <button onClick={() => { setChangePwId(u.id); setNewPw(""); }} className="text-red-600 hover:underline text-sm font-medium">Change Password</button>
                {!u.isSelf && (
                  <button onClick={() => handleDelete(u.id, u.username)} className="text-gray-400 hover:text-red-600 transition-colors text-sm">Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
