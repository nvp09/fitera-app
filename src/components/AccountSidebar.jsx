import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AccountSidebar() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-[#F2F2EE] p-6">
      {/* Profile */}
      <div className="mb-6 flex items-center gap-3">
        <img
          src={user.avatar}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">Member</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 text-sm ${
              isActive
                ? "bg-white font-medium"
                : "hover:bg-white/60"
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/reset-password"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 text-sm ${
              isActive
                ? "bg-white font-medium"
                : "hover:bg-white/60"
            }`
          }
        >
          Reset password
        </NavLink>
      </nav>
    </div>
  );
}
