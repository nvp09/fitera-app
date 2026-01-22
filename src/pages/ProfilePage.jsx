import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  // ===== mock user data  =====
  const [name, setName] = useState("Moodeng ja");
  const [username, setUsername] = useState("moodeng_cute");
  const [email] = useState("moodeng.cute@gmail.com");

  // ===== handler save =====
  const handleSave = (e) => {
    e.preventDefault();

    //  mock success
    toast.success("Saved profile", {
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-16">
      {/* ===== container ===== */}
      <div className="mx-auto w-[420px] rounded-[24px] bg-[#EFEDE8] p-8">
        {/* ===== header ===== */}
        <h1 className="mb-6 text-center text-xl font-semibold">
          Profile
        </h1>

        {/* ===== profile image ===== */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 h-20 w-20 rounded-full bg-gray-400" />
          <button
            type="button"
            className="rounded-full border bg-white px-4 py-1 text-xs"
          >
            Upload profile picture
          </button>
        </div>

        {/* ===== form ===== */}
        <form onSubmit={handleSave}>
          {/* ===== NAME ===== */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[10px] border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* ===== USERNAME ===== */}
          <div className="mb-4">
            <label className="mb-1 block text-sm">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-[10px] border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* ===== EMAIL (readonly) ===== */}
          <div className="mb-6">
            <label className="mb-1 block text-sm">
              Email
            </label>
            <input
              value={email}
              disabled
              className="w-full rounded-[10px] border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
            />
          </div>

          {/* ===== SAVE BUTTON ===== */}
          <button
            type="submit"
            className="mx-auto block rounded-full bg-black px-8 py-2 text-sm text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
