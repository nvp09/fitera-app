import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();

  // ===== form state =====
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== ui state =====
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ===== ERROR TOAST  =====
  const showErrorToast = () => {
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
            Please check your information
          </p>
          <p className="mt-1 text-sm text-white/90">
            Some fields are missing or incorrect.
          </p>
        </div>
      ),
      {
        position: "bottom-right",
        duration: 4000,
      }
    );
  };

  // ===== validate + submit =====
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!username.trim()) newErrors.username = "Username is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must be a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (email === "moodeng.cute@gmail.com") {
      newErrors.email =
        "Email is already taken. Please try another email.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showErrorToast();
      return;
    }

    /* =========================
       ✅ เพิ่มโค้ดตรงนี้ (อย่างเดียว)
       ========================= */
    const registeredUser = {
      id: Date.now(),
      name,
      username,
      email,
      password,
      avatar: "https://i.pravatar.cc/40",
      role: "user",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );
    /* ========================= */

    toast.success("Sign up successful");
    setSuccess(true);
  };

  /* ===== SUCCESS SCREEN ===== */
  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4">
        <div className="w-full max-w-[360px] rounded-2xl bg-[#EFEDE8] p-8 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white text-2xl">
            ✓
          </div>

          <h2 className="mb-6 font-semibold">
            Registration success
          </h2>

          <button
            onClick={() => navigate("/login")}
            className="mx-auto rounded-full bg-black px-8 py-2 text-sm text-white"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ======= MOBILE ======= */}
      <div className="min-h-screen bg-[#F7F5F0] md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">
            hh<span className="text-gray-400">.</span>
          </span>
          <span className="text-xl">≡</span>
        </div>

        <div className="flex justify-center px-4 pt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full max-w-[360px] rounded-2xl bg-[#EFEDE8] p-6"
          >
            <h1 className="mb-6 text-center text-2xl font-semibold">
              Sign up
            </h1>

            {/* Name */}
            <div className="mb-3">
              <label className="text-sm">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={`w-full rounded-lg border px-3 py-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="text-sm">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className={`w-full rounded-lg border px-3 py-2 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`w-full rounded-lg border px-3 py-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className={`w-full rounded-lg border px-3 py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-sm text-white"
            >
              Sign up
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden min-h-screen items-center justify-center bg-[#F7F5F0] md:flex px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[420px] rounded-[24px] bg-[#EFEDE8] p-8"
        >
          <p className="mb-2 text-center text-sm text-[#C28B4E]">
            Create account
          </p>

          <h1 className="mb-6 text-center text-2xl font-semibold">
            Sign up
          </h1>

          {/* Name */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={`w-full rounded-[10px] border px-3 py-2 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className={`w-full rounded-[10px] border px-3 py-2 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={`w-full rounded-[10px] border px-3 py-2 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-1 block text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className={`w-full rounded-[10px] border px-3 py-2 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            className="mx-auto block rounded-full bg-black px-10 py-2 text-sm text-white"
          >
            Sign up
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
