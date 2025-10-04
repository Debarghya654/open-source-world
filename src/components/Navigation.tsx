import React, { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import { useTheme } from "../context/ThemeContext";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Memoized event handlers
  const handleScroll = useCallback(() => setIsScrolled(window.scrollY > 50), []);
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Initiatives", href: "#initiatives" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navBg = isScrolled
    ? theme === "light"
      ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
      : "bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-700"
    : "bg-transparent";

  const iconButtonClasses = `p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] ${
    isScrolled
      ? theme === "light"
        ? "text-secondary-700 hover:bg-gray-100"
        : "text-white hover:bg-gray-800"
      : "text-white hover:bg-white/10"
  }`;

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("#hero")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-14 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#073f70] to-[#1f84d6]">
                <span className="text-white font-bold text-base sm:text-lg">OSW</span>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? theme === "light"
                        ? "text-secondary-700 hover:text-primary-600"
                        : "text-gray-300 hover:text-white"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={iconButtonClasses}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={iconButtonClasses}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen((p) => !p)}
                aria-label="Toggle mobile menu"
                className={iconButtonClasses}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              } shadow-2xl`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <span
                    className={`text-xl font-bold ${
                      theme === "light" ? "text-primary-600" : "text-white"
                    }`}
                  >
                    Menu
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={iconButtonClasses}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Items */}
                <div className="flex-1 py-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors ${
                        theme === "light"
                          ? "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className={`p-4 border-t ${
                    theme === "light" ? "border-gray-200" : "border-gray-700"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Open Source World
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
