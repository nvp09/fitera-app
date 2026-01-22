import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ===== form state =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== error state (error สีแดง) =====
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ===== submit handler =====
  const handleSubmit = (e) => {
    e.preventDefault();

    /** mock logic * email: admin@fitera.com * password: admin123 */
    
    // Trim whitespace และ normalize
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    
    
    // ตรวจสอบเงื่อนไขการ login
    const isEmailCorrect = trimmedEmail === "admin@fitera.com";
    const isPasswordCorrect = trimmedPassword === "admin123";
    
    if (isEmailCorrect && isPasswordCorrect) {
      console.log("✅ Login credentials are correct!");
      setHasError(false);
      setErrorMessage("");

      // Login admin user
      const adminUserData = {
        id: 1,
        name: "ADMIN_01",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "admin",
        email: "admin@fitera.com",
      };
      
      console.log("Calling login with:", adminUserData);
      login(adminUserData);
      console.log("Login function called");

      toast.success("Login success", {
        description: "Welcome to Admin panel",
      });

      // รอให้ user state อัพเดทก่อน navigate
      setTimeout(() => {
        console.log("Navigating to /admin");
        navigate("/admin", { replace: true });
      }, 100);
    } else {
      console.log("❌ Login failed - credentials don't match");
      setHasError(true);
      setErrorMessage("Your password is incorrect or this email doesn't exist");

      toast.error("Login failed", {
        description:
          "Your password is incorrect or this email doesn't exist",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] py-20">
      {/* ===== container ===== */}
      <div className="mx-auto w-[420px] rounded-[24px] bg-[#F7F5F0] p-10">
        {/* ===== header ===== */}
        <p className="mb-1 text-center text-[12px] text-[#C77A4A]">
          Admin panel
        </p>

        <h1 className="mb-8 text-center text-2xl font-semibold">
          Log in
        </h1>

        {/* ===== form ===== */}
        <form onSubmit={handleSubmit}>
          {/* ===== EMAIL ===== */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (hasError) {
                  setHasError(false);
                  setErrorMessage("");
                }
              }}
              autoComplete="username"
              placeholder="admin@fitera.com"
              className={`
                w-full rounded-[10px] px-3 py-2 text-sm
                border
                ${
                  hasError
                    ? "border-red-400"
                    : "border-gray-300"
                }
              `}
            />
          </div>

          {/* ===== PASSWORD ===== */}
          <div className="mb-6">
            <label className="mb-1 block text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (hasError) {
                  setHasError(false);
                  setErrorMessage("");
                }
              }}
              autoComplete="current-password"
              placeholder="admin123"
              className={`
                w-full rounded-[10px] px-3 py-2 text-sm
                border
                ${
                  hasError
                    ? "border-red-400"
                    : "border-gray-300"
                }
              `}
            />
          </div>

          {/* ===== LOGIN BUTTON ===== */}
          <button
            type="submit"
            className={`
              mx-auto block rounded-full px-10 py-2 text-sm text-white
              ${
                hasError
                  ? "border-2 border-red-400 bg-black"
                  : "bg-black"
              }
            `}
          >
            Log in
          </button>
        </form>

        {/* ===== ERROR MESSAGE BOX ===== */}
        {hasError && errorMessage && (
          <div className="relative mt-4 rounded-lg bg-red-100 border-2 border-red-300 p-4">
            <button
              onClick={() => {
                setHasError(false);
                setErrorMessage("");
              }}
              className="absolute right-3 top-3 text-red-800 text-lg font-bold hover:text-red-900"
            >
              ✕
            </button>
            <p className="pr-8 text-sm font-semibold text-red-900">
              {errorMessage}
            </p>
            <p className="mt-1 pr-8 text-xs text-red-800">
              Please try another password or email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
