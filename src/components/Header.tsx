import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import nvidia_logo from "../data/nvidia_logo.png"

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
      <img src={nvidia_logo} alt="NVIDIA Logo" className="h-10 w-auto" />
      <div className="px-2 font-bold" style={{ color: 'white', fontSize: '1.5rem'}}>Buildtracker</div>
      </div>

      <nav className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a className="hover:underline" href="/">
              Home
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuTrigger asChild>
            <a className="hover:underline" href="/builds">
              Build Sheet
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuTrigger asChild>
            <a className="hover:underline" href="/buildstatus">
              Build Status
            </a>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Header;
