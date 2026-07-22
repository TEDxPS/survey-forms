"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin/forms", label: "Forms", icon: "📋" },
  { href: "/admin/users", label: "Users", icon: "👤" },
  { href: "/admin/site-config", label: "Site Config", icon: "🎨" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      className={`min-h-screen bg-gray-900 text-gray-100 flex flex-col shrink-0 transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center border-b border-gray-700 h-14 ${
          collapsed ? "justify-center px-0" : "justify-between px-4"
        }`}
      >
        {!collapsed && (
          <div>
            <span className="text-red-500 font-bold text-lg tracking-tight">TEDx</span>
            <span className="ml-1 text-xs text-gray-400">Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400
                     hover:bg-gray-800 hover:text-white transition-colors shrink-0"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-2 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign out" : undefined}
          className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm
                      text-gray-400 hover:bg-gray-800 hover:text-white transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-base shrink-0">↩</span>
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
