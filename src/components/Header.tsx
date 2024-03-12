import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-green-400 text-white py-4 px-6 flex items-center justify-between">
      <div className="text-lg font-bold">Buildtracker</div>
      <nav className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a className="hover:underline" href="#">
              View Builds
            </a>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Header;
