import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#E6E6E6] bg-[#FBFAF8] relative z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-10 max-w-[1280px]">
        {/* Logo */}
        <span className="text-lg font-bold text-[#1C1C1C]">
          Thomson P<span className="text-green-500">.</span>
        </span>

        {/* ===== Desktop ===== */}
        <div className="hidden md:flex items-center gap-3 hover:text-[15px]">
          <button className="h-10 rounded-full border border-[#1C1C1C] px-5 text-[14px] cursor-pointer hover:text-[15px] hover:bg-[#F0F0F0]">
            Log in
          </button>
          <button className="h-10 rounded-full bg-[#1C1C1C] px-5 text-[14px] cursor-pointer hover:text-[15px]  text-white hover:bg-black">
            Sign up
          </button>
        </div>

        {/* ===== Mobile (Dropdown Panel) ===== */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden text-2xl cursor-pointer">
            ☰
          </DropdownMenuTrigger>

          <DropdownMenuContent
  align="end"
  sideOffset={12}
  className="
    w-screen 
    max-w-[90vw]  
    rounded-none
    border border-[#E6E6E6]
    bg-[#FBFAF8]
    p-6
    shadow-lg
    md:hidden
    
  "
>

            <div className="flex flex-col items-center gap-4">
              {/* Log in */}
              <button
                className="
                  h-12
                  w-full
                  rounded-full
                  border border-[#1C1C1C]
                  text-[14px]
                  hover:bg-[#F0F0F0]
                  cursor-pointer
                  hover:text-[15px]
                "
              >
                Log in
              </button>

              {/* Sign up */}
              <button
                className="
                  h-12
                  w-full
                  rounded-full
                  bg-[#1C1C1C]
                  text-[14px]
                  text-white
                  hover:bg-black
                  cursor-pointer
                  hover:text-[15px]
                "
              >
                Sign up
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
