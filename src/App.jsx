import { Routes, Route } from "react-router-dom";

// ===== layouts =====
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AccountLayout from "./layouts/AccountLayout";
import AdminLayout from "./layouts/AdminLayout";

// ===== pages =====
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminArticleDetail from "./pages/AdminArticleDetail";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {/* ======= PUBLIC (มี Navbar / Footer)======= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostPage />} />
      </Route>

      {/* ===== AUTH (Login / Signup)(ไม่มี Navbar กลาง)แต่ละ page ทำ mobile navbar เอง =====*/}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* ====== MEMBER / ACCOUNT ต้อง login ก่อน มี Navbar + Sidebar (desktop) mobile ใช้ layout แยก =======*/}
      <Route element={<AccountLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* ====== ADMIN =======*/}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/article/:postId" element={<AdminArticleDetail />} />
      </Route>

      {/* ====== FALLBACK =======*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
