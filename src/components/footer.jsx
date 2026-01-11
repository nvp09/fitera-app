import githubIcon from "./pic/github.png";
import googleIcon from "./pic/google.png";
import linkedinIcon from "./pic/linkin.png";

function MobileFooter() {
  return (
    <footer className="mt-12 bg-[#F3F1ED]">
      <div
        className="
          max-w-6xl mx-auto
          px-4 py-8
          flex flex-col gap-6
          items-center
          md:flex-row
          md:justify-between
        "
      >
        {/* LEFT: Get in touch + icons */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-600">
            Get in touch
          </span>

          <div className="flex items-center gap-4">
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="w-5 h-5 object-contain cursor-pointer hover:opacity-70"
            />
            <img
              src={githubIcon}
              alt="GitHub"
              className="w-5 h-5 object-contain cursor-pointer hover:opacity-70"
            />
            <img
              src={googleIcon}
              alt="Google"
              className="w-5 h-5 object-contain cursor-pointer hover:opacity-70"
            />
          </div>
        </div>

        {/* RIGHT: Home page */}
        <p className="text-sm underline text-gray-700 cursor-pointer hover:text-[15px] hover:opacity-70">
          Home page
        </p>
      </div>
    </footer>
  );
}

export default MobileFooter;
