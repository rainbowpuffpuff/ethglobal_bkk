import { useEffect, useState } from "react";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const currentTheme = theme;
    if (currentTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div
      className={`w-[53px] h-[30px] bg-primary rounded-full flex items-center px-[3px] cursor-pointer ${
        theme === "light" ? "justify-start" : "justify-end"
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`w-[24px] h-[24px] bg-accent text-accent-content rounded-full flex items-center justify-center transition-all duration-200`}
      >
        <FontAwesomeIcon icon={faSun} className="h-[19px]" />
      </div>
    </div>
  );
}
