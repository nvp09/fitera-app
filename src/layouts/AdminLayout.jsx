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
  const { user, logout, isLoggedIn } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);

  // Protect route - redirect to login if not logged in
  useEffect(() => {
    console.log("AdminLayout - Checking auth:", { user, isLoggedIn, role: user?.role });
    
    // ตรวจสอบว่า user login และมี role เป็น admin หรือไม่
    if (!isLoggedIn || !user) {
      console.log("❌ Not logged in, redirecting to /admin/login");
      navigate("/admin/login", { replace: true });
      return;
    }
    
    if (user.role !== "admin") {
      console.log("❌ User is not admin, redirecting to /admin/login");
      navigate("/admin/login", { replace: true });
      return;
    }
    
    console.log("✅ User is authenticated as admin");
  }, [user, isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // If not logged in, don't render (will redirect)
  if (!isLoggedIn || !user || user.role !== "admin") {
    return null;
  }

  const adminUser = user;

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between bg-[#1C1C1C] px-10 py-4 text-white">
        <p className="text-sm font-semibold">Admin</p>

        {/* ===== : Notification + User Dropdown ===== */}
        <div className="flex items-center gap-4">
          {/* ===== NOTIFICATION BELL ===== */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="relative cursor-pointer"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* ===== NOTIFICATION POPUP ===== */}
            {showNotification && (
              <div className="absolute right-0 top-10 z-50 w-[320px] rounded-xl bg-white p-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/32?img=5"
                    alt="Jacob Lash"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">Jacob Lash</span>{" "}
                      Commented on your article.
                    </p>
                    <p className="mt-1 text-xs text-orange-500">
                      4 hours ago
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
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
              <span className="text-sm font-medium">{adminUser.name}</span>
              <ChevronDown size={16} className="text-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-52 rounded-xl bg-white p-2 shadow-xl"
            >
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User size={16} />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/reset-password")}>
                <Key size={16} />
                Reset password
              </DropdownMenuItem>

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
      <main className="bg-[#F7F5F0]">
        <Outlet />
      </main>
    </div>
  );
}
