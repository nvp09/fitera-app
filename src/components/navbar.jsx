export default function MobileNavbar() {
  return (
    <nav className="w-full border-b border-[#E6E6E6] bg-[#FBFAF8]">
      <div
        className="
          mx-auto
          flex items-center justify-between
          px-4 py-3
          md:px-10
          max-w-[1280px]
        "
      >
        {/* Logo */}
        <span className="text-lg font-bold text-[#1C1C1C]">
          hh.
        </span>

        {/* ===== Desktop ===== */}
        <div className="hidden md:flex items-center gap-3">
          {/* Log in */}
          <button
            className="
              h-10
              rounded-full
              border border-[#1C1C1C]
              px-5
              text-[14px]
              font-medium
              text-[#1C1C1C]
              cursor-pointer
              hover:bg-[#F0F0F0]
            "
          >
            Log in
          </button>

          {/* Sign up */}
          <button
            className="
              h-10
              rounded-full
              bg-[#1C1C1C]
              px-5
              text-[14px]
              font-medium
              text-white
              cursor-pointer
              hover:bg-black
            "
          >
            Sign up
          </button>
        </div>

        {/* ===== Mobile hamburger ===== */}
        <button className="md:hidden text-2xl leading-none cursor-pointer">
          ☰
        </button>
      </div>
    </nav>
  );
}
