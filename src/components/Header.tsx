"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoLibrary } from "react-icons/io5";

interface HeaderProps {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

const Header = memo<HeaderProps>(({ theme, setTheme }) => {
  const [animationClass, setAnimationClass] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleTheme = useCallback(() => {
    setAnimationClass("animate__animated animate__bounce");
    setTimeout(() => setAnimationClass(""), 800);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const isActive = useCallback(
    (path: string) =>
      pathname === path || (path !== "/" && pathname.startsWith(path + "/")),
    [pathname],
  );

  const navLinks = [
    { href: "/unreal-engine", label: "Unreal" },
    { href: "/golang", label: "Golang" },
    { href: "/react", label: "React" },
  ];

  const themeButtonClass = `border border-white/20 dark:border-gray-800/40 rounded-lg h-[36px] w-[36px] flex cursor-pointer transition-all backdrop-blur-sm bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 ${animationClass}`;

  return (
    <nav
      className="w-full backdrop-blur-xl fixed text-white/80 dark:text-gray-800 z-50 bg-[#202023]/25 dark:bg-[#f0e7db]/25 border-b border-white/5 dark:border-gray-800/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-225 h-14 flex mx-auto px-4 sm:px-6 relative">
        <div className="flex min-w-full my-auto items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
              aria-label="Library home"
            >
              <IoLibrary
                size={17}
                className="text-[#81e6d9]"
                aria-hidden="true"
              />
              <span>
                <span className="text-[#81e6d9]">zsh</span>library
              </span>
            </Link>

            <div className="hidden lg:flex gap-x-1 items-center ml-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1 rounded text-[13px] transition-colors hover:underline hover:underline-offset-4 ${
                    isActive(link.href)
                      ? "bg-[#81e6d9]/15 text-[#81e6d9]"
                      : "text-white/55 dark:text-gray-800/55 hover:text-white/85 dark:hover:text-gray-800"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="hidden md:flex gap-2 items-center">
              <a
                href="https://github.com/zshstacks/library"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4 flex gap-1 items-center text-[13px] transition-opacity hover:opacity-80 text-white/50 dark:text-gray-800/50 px-2"
                aria-label="View source on GitHub"
              >
                <FaGithub size={13} aria-hidden="true" />
                <span>Source</span>
              </a>

              <a
                href="https://zshstacks.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/50 dark:text-gray-800/50 hover:text-[#81e6d9] dark:hover:text-[#2c7a7b] transition-colors px-2 hover:underline hover:underline-offset-4"
              >
                Portfolio ↗
              </a>

              <button
                className={themeButtonClass}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "warm" : "dark"} mode`}
              >
                {theme === "light" ? (
                  <MdOutlineLightMode
                    size={18}
                    className="m-auto text-amber-300"
                    aria-hidden="true"
                  />
                ) : (
                  <MdDarkMode
                    size={18}
                    className="m-auto text-indigo-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <IoClose size={22} aria-hidden="true" />
                ) : (
                  <RxHamburgerMenu size={22} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-14 w-50 right-0 bg-[#202023]/95 dark:bg-[#f0e7db]/95 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-2xl lg:hidden rounded-b-lg border border-white/10 dark:border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2 rounded text-sm transition-colors ${
                  isActive(link.href)
                    ? "bg-[#81e6d9]/15 text-[#81e6d9]"
                    : "text-white/70 dark:text-gray-800/70 hover:bg-white/10 dark:hover:bg-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 pt-2 border-t border-white/10 dark:border-gray-300">
              <button className={themeButtonClass} onClick={toggleTheme}>
                {theme === "light" ? (
                  <MdOutlineLightMode
                    size={18}
                    className="m-auto text-amber-300"
                  />
                ) : (
                  <MdDarkMode size={18} className="m-auto text-indigo-400" />
                )}
              </button>
              <a
                href="https://zshstacks.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/50 dark:text-gray-800/50 hover:text-[#81e6d9]"
              >
                Portfolio ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Header.displayName = "Header";
export default Header;
