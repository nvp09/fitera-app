import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import AccountSidebar from "../components/AccountSidebar";
import AccountMobileTabs from "../components/AccountMobileTabs";

export default function AccountLayout() {
  const { user } = useAuth();

  // กันคนยังไม่ login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Navbar แสดงทั้ง desktop + mobile */}
      <Navbar />

      {/* ================= DESKTOP ================= */}
      <div className="mx-auto hidden max-w-[1280px] px-4 py-8 md:block">
        <div className="grid grid-cols-[260px_1fr] gap-8">
          <AccountSidebar />

          {/* Outlet ใช้แค่ตรงนี้ */}
          <Outlet />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {/* Tabs + header */}
        <AccountMobileTabs />

        {/* เนื้อหาหน้าเดียวกัน */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
