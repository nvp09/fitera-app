import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import useNavigation from "../hooks/useNavigation";
import { useAuth } from "../contexts/AuthContext";
import { Bell, Menu } from "lucide-react";

export default function Navbar() {
  const { goTo } = useNavigation();
  const { user, logout } = useAuth();

  //  state mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ปิด mobile menu เมื่อเข้า desktop
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (media.matches) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    media.addEventListener("change", handleResize);

    return () => {
      media.removeEventListener("change", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    goTo("/");
  };

  return (
    <nav className="relative z-50 w-full border-b border-[#E6E6E6] bg-[#FBFAF8]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-10">
        {/* ===== Logo ===== */}
        <span
          className="cursor-pointer text-lg font-bold text-[#1C1C1C]"
          onClick={() => goTo("/")}
        >
          Thomson P<span className="text-green-500">.</span>
        </span>

        {/* ===== RIGHT SIDE ===== */}
        <div className="flex items-center gap-4">
          {/* ================= DESKTOP ================= */}
          {!user && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => goTo("/login")}
                className="h-10 rounded-full border border-[#1C1C1C] px-5 text-sm"
              >
                Log in
              </button>

              <button
                onClick={() => goTo("/signup")}
                className="h-10 rounded-full bg-[#1C1C1C] px-5 text-sm text-white"
              >
                Sign up
              </button>
            </div>
          )}

          {user && (
            <div className="hidden md:flex items-center gap-4">
              {/* Notification (DESKTOP) */}
              <DropdownMenu>
                <DropdownMenuTrigger className="relative cursor-pointer">
                  <Bell size={20} />
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-64 rounded-xl bg-white p-3 shadow-xl"
                >
                  <div className="flex gap-3 rounded-md p-2 hover:bg-gray-50">
                    <img
                      src="https://i.pravatar.cc/32?img=5"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p>
                        <b>Jacob Lash</b> commented on your article.
                      </p>
                      <p className="text-xs text-orange-500">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile (DESKTOP) */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.avatar}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium">
                    {user.name}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-52 rounded-xl bg-white p-2 shadow-xl"
                >
                  <DropdownMenuItem onClick={() => goTo("/profile")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => goTo("/reset-password")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Reset password
                  </DropdownMenuItem>

                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => goTo("/admin")}>
                      Admin panel
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* ====== MOBILE ONLY ======*/}
          <div className="md:hidden">
            <DropdownMenu
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <DropdownMenuTrigger className="cursor-pointer">
                <Menu size={22} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-[520px] bg-[#FBFAF8] p-6 shadow-xl"
              >
                {!user && (
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        goTo("/login");
                      }}
                      className="w-full rounded-full border border-black py-3 text-sm"
                    >
                      Log in
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        goTo("/signup");
                      }}
                      className="w-full rounded-full bg-black py-3 text-sm text-white"
                    >
                      Sign up
                    </button>
                  </div>
                )}

                {user && (
                  <>
                    {/* ===== MOBILE HEADER ===== */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          className="h-10 w-10 rounded-full"
                        />
                        <span className="text-sm font-medium">
                          {user.name}
                        </span>
                      </div>

                      {/* Notification (BELL*MOBILE) */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="relative right-10 cursor-pointer">
                          <Bell size={25} />
                          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          sideOffset={12}
                          className="w-[400px] h-40 bg-white p-3 shadow-xl"
                        >
                          <div className="flex gap-3 rounded-md p-2 hover:bg-gray-50">
                            <img
                              src="https://i.pravatar.cc/32?img=5"
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="text-sm">
                              <p>
                                <b>Jacob Lash</b> commented on your article.
                              </p>
                              <p className="text-xs text-orange-500">
                                4 hours ago
                              </p>
                            </div>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* ===== MENU LIST ===== */}
                    <div className="space-y-2 text-sm">
                      <DropdownMenuItem
                        onClick={() => {
                          setMobileMenuOpen(false);
                          goTo("/profile");
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setMobileMenuOpen(false);
                          goTo("/reset-password");
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        Reset password
                      </DropdownMenuItem>

                      <div className="my-2 border-t" />

                      <DropdownMenuItem
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                        Log out
                      </DropdownMenuItem>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
