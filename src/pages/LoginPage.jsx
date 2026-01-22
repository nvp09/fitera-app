import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ===== form state =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== inline error =====
  const [error, setError] = useState("");

  // ===== mock user  =====
  const MOCK_USER = {
    id: 1,
    name: "Thompson P.",
    email: "moodeng.cute@gmail.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/40?img=12",
    role: "admin",
  };

  // ===== error toast =====
  const showLoginErrorToast = () => {
    toast.custom(
      (t) => (
        <div className="relative w-[360px] rounded-xl bg-[#E0565B] px-4 py-3 text-white shadow-lg">
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute right-3 top-2 text-lg"
          >
            ✕
          </button>

          <p className="font-semibold">
            Your password is incorrect or this email doesn’t exist
          </p>
          <p className="mt-1 text-sm text-white/90">
            Please try another password or email
          </p>
        </div>
      ),
      {
        position: "bottom-right",
        duration: 4000,
      }
    );
  };

  // ===== LOGIN HANDLER =====
  const handleLogin = () => {
    // 1. empty
    if (!email || !password) {
      setError("Email and password are required");
      showLoginErrorToast();
      return;
    }

    // 2. email format
    if (!email.includes("@")) {
      setError("Email must be a valid email");
      showLoginErrorToast();
      return;
    }

    // 3. password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      showLoginErrorToast();
      return;
    }

    /* ======  logic ===== */
    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    const isMockUserMatch =
      email === MOCK_USER.email &&
      password === MOCK_USER.password;

    const isRegisteredUserMatch =
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password;

    if (!isMockUserMatch && !isRegisteredUserMatch) {
      setError(
        "Your password is incorrect or this email doesn’t exist"
      );
      showLoginErrorToast();
      return;
    }

    const loggedInUser = isMockUserMatch
      ? MOCK_USER
      : registeredUser;
    /* ====================================== */

    // ===== SUCCESS =====
    setError("");
    login(loggedInUser);
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <>
      {/* ===== MOBILE ===== */}
      <div className="min-h-screen bg-[#F7F5F0] md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-lg font-bold">
            hh<span className="text-gray-400">.</span>
          </span>
          <Menu size={22} />
        </div>

        <div className="px-4 pt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="mx-auto w-full max-w-[360px] rounded-2xl bg-[#EFEDE8] p-6"
          >
            <h1 className="mb-6 text-center text-2xl font-semibold">
              Log in
            </h1>

            {/* Email */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                autoComplete="email"
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  error ? "border-red-500 bg-red-50" : ""
                }`}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="mb-1 block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  error ? "border-red-500 bg-red-50" : ""
                }`}
              />
            </div>

            {error && (
              <p className="mb-4 text-xs text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-sm text-white"
            >
              Log in
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have any account?{" "}
              <Link to="/signup" className="font-semibold underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden min-h-screen items-center justify-center bg-[#F7F5F0] md:flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="w-[360px] rounded-[24px] bg-white p-8"
        >
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Log in
          </h1>

          {/* Email */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="email"
              className="w-full rounded-full border px-4 py-2"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
              className="w-full rounded-full border px-4 py-2"
            />
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-black py-3 text-white"
          >
            Log in
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have any account?{" "}
            <Link to="/signup" className="font-semibold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
