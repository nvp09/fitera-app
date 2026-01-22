import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ===== submit reset =====
  const handleReset = () => {
    // mock reset success
    toast.success("Password reset successfully");

    setShowConfirm(false);
    setShowSuccess(true);
  };

  // ===== after success =====
  const handleGoToLogin = () => {
    // security: logout current session
    logout();

    // redirect
    navigate("/login");
  };

  return (
    <>
      {/* ===== Reset Form ===== */}
      <div className="max-w-[520px] rounded-2xl bg-[#F2F2EE] p-8">
        <h1 className="mb-8 text-2xl font-semibold">
          Reset password
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1">
              Current password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              New password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full rounded-full bg-black py-3 text-white"
          >
            Reset password
          </button>
        </div>
      </div>

      {/* ===== Confirm Modal ===== */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[420px] rounded-2xl bg-white p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold">
              Reset password
            </h2>

            <p className="mb-6 text-sm text-gray-600">
              Do you want to reset your password?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-full border px-6 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleReset}
                className="rounded-full bg-black px-6 py-2 text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Success Modal ===== */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[420px] rounded-2xl bg-white p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Reset successful
            </h2>

            <p className="mb-6 text-gray-600">
              Your password has been updated.  
              Please log in again.
            </p>

            <button
              onClick={handleGoToLogin}
              className="w-full rounded-full bg-black py-3 text-white"
            >
              Go to login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
