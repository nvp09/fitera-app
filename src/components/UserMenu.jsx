import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  RotateCcw,
  LogOut,
  Menu,
  X,
} from "lucide-react";

/* UserMenu * - Mobile user menu (overlay จากด้านบน) */
export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* =====  ICONS (บน Navbar) ===== */}
      <div className="flex items-center gap-3">
        {/* ☰ Menu */}
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* ===== MOBILE OVERLAY MENU (TOP ONLY) ===== */}
      {open && (
        <>
          {/* overlay backdrop (โปร่ง) */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setOpen(false)}
          />

          {/* menu panel */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              {/* : avatar + name */}
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
                <span className="font-medium">Thompson P.</span>
              </div>

              {/* : bell + close */}
              <div className="flex items-center gap-4">
                {/* 🔔 Notification */}
                <button className="relative">
                  <Bell size={20} />
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* ✕ Close */}
                <button onClick={() => setOpen(false)}>
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* ===== MENU ITEMS ===== */}
            <div className="px-4 py-6 space-y-6">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="flex items-center gap-3 text-[16px]"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/reset-password");
                  setOpen(false);
                }}
                className="flex items-center gap-3 text-[16px]"
              >
                <RotateCcw size={18} />
                Reset password
              </button>

              <hr />

              <button
                onClick={() => {
                  alert("logout (mock)");
                  setOpen(false);
                }}
                className="flex items-center gap-3 text-[16px] text-red-600"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
