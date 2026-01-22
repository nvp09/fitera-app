import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AccountMobileTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const isProfile = location.pathname === "/profile";
  const isReset = location.pathname === "/reset-password";

  return (
    <>
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <img
          src={user.avatar}
          className="h-8 w-8 rounded-full"
          alt="avatar"
        />
        <span className="text-sm font-medium">
          {user.name}
        </span>
      </div>

      {/* ===== Tabs ===== */}
      <div className="flex border-b text-sm">
        <button
          onClick={() => navigate("/profile")}
          className={`flex-1 py-3 ${
            isProfile
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => navigate("/reset-password")}
          className={`flex-1 py-3 ${
            isReset
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
        >
          Reset password
        </button>
      </div>
    </>
  );
}
