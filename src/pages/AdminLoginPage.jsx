import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      const { access_token } = response.data;

      // 🔥 เก็บ token
      localStorage.setItem("token", access_token);

      // 🔥 ดึง user จริงจาก backend
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/get-user",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      login(userResponse.data);

      toast.success("Login success", {
        description: "Welcome to Admin panel",
      });

      navigate("/admin", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setHasError(true);
      setErrorMessage("Login failed");
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] py-20">
      <div className="mx-auto w-[420px] rounded-[24px] bg-[#F7F5F0] p-10">
        <p className="mb-1 text-center text-[12px] text-[#C77A4A]">
          Admin panel
        </p>

        <h1 className="mb-8 text-center text-2xl font-semibold">
          Log in
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] px-3 py-2 text-sm border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[10px] px-3 py-2 text-sm border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="mx-auto block rounded-full px-10 py-2 text-sm text-white bg-black"
          >
            Log in
          </button>
        </form>

        {hasError && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
