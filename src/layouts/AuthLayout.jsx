import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F1ED]">
      {/* ใช้กับ login / signup */}
      <Outlet />
    </div>
  );
}
