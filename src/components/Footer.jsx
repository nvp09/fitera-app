import githubIcon from "./pic/github.png";
import googleIcon from "./pic/google.png";
import linkedinIcon from "./pic/linkin.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-12 bg-[#F3F1ED]">
      <div
        className="
          mx-auto
          max-w-6xl
          px-4 py-8
          flex flex-col gap-6
          items-center
          md:flex-row
          md:justify-between
        "
      >
        {/* ===== Get in touch + icons ===== */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-600">
            Get in touch
          </span>

          <div className="flex items-center gap-4">
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="h-5 w-5 cursor-pointer object-contain hover:opacity-70"
            />
            <img
              src={githubIcon}
              alt="GitHub"
              className="h-5 w-5 cursor-pointer object-contain hover:opacity-70"
            />
            <img
              src={googleIcon}
              alt="Google"
              className="h-5 w-5 cursor-pointer object-contain hover:opacity-70"
            />
          </div>
        </div>

        {/* ===== Home page ===== */}
        <button
          onClick={() => navigate("/")}
          className="
            text-sm
            text-gray-700
            underline
            hover:opacity-70
          "
        >
          Home page
        </button>
      </div>
    </footer>
  );
}
