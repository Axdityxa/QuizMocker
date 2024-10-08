import Link from "next/link";
import { useState } from "react";
// import { CgMenuGridO } from "react-icons/cg";
import { HiMenuAlt2 } from "react-icons/hi";


const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const useMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const links = [
    { name: "Stats", path: "/stats" },
    { name: "Leaderboard", path: "/leaderboards" },
  ];

  return (
    <div
      className="text-xl mt-1 cursor-pointer p-2"
      onMouseEnter={() => setOpenUserMenu(true)}
      onMouseLeave={() => setOpenUserMenu(false)}
    >
      <div className="relative">
        {/* <CgMenuGridO /> */}
        <HiMenuAlt2 />
        {openUserMenu && (
          <ul className="absolute shadow bg-qborder z-[99] top-7 sm:left-[-90px] left-[-80px] p-3 text-dark rounded-md text-center">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpenUserMenu(false)}
              >
                <li className=" px-2 py-2 hover:scale-105 rounded-md shadow transition-colors duration-500 hover:bg-navbar/80">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserMenu;