import { Menu } from "lucide-react";

export default function AuthMobileHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 md:hidden">
      <span className="font-bold">
        hh<span className="text-gray-400">.</span>
      </span>

      {/* hamburger */}
      <Menu size={22} />
    </div>
  );
}
