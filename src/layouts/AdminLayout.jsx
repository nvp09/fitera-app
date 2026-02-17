import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, User, Key, Monitor, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isLoading } = useAuth();

  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);

  // ===== PROTECT ROUTE =====
  useEffect(() => {
    console.log("AdminLayout - Checking auth:", {
      user,
      isLoggedIn,
      role: user?.role,
      isLoading,
    });

    if (isLoading) return;

    if (!isLoggedIn || !user) {
      navigate("/admin/login", { replace: true });
      return;
    }

    if (user.role?.toLowerCase() !== "admin") {
      navigate("/admin/login", { replace: true });
      return;
    }
  }, [user, isLoggedIn, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // ===== CLOSE NOTIFICATION WHEN CLICK OUTSIDE =====
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== RENDER CONTROL (หลัง hooks ทั้งหมดแล้วเท่านั้น) =====
  if (isLoading) {
    return null; // รอโหลด
  }

  if (!isLoggedIn || !user || user.role?.toLowerCase() !== "admin") {
    return null; // useEffect จะ redirect
  }

  const adminUser = user;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between bg-[#1C1C1C] px-10 py-4 text-white">
        <p className="text-sm font-semibold">Admin</p>

        <div className="flex items-center gap-4">
          {/* ===== NOTIFICATION ===== */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="relative cursor-pointer"
            >
              <Bell size={20} />
            </button>

            {showNotification && (
              <div className="absolute right-0 top-10 w-[320px] rounded-xl bg-white p-4 shadow-xl">
                Notification
              </div>
            )}
          </div>

          {/* ===== USER DROPDOWN ===== */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                className="h-8 w-8 rounded-full"
              />
              <span>{adminUser.name}</span>
              <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                <Monitor size={16} />
                Admin panel
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500"
              >
                <LogOut size={16} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
