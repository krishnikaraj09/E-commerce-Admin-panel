import { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.theme || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.theme = theme;
    }, [theme]);

    return (
        <div>
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-16 h-8 bg-gray-300 dark:bg-black rounded-full relative focus:outline-none"
            >
                <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform absolute top-0 ${theme === "dark" ? "translate-x-8" : "translate-x-0"}`}></div>
            </button>
        </div>
    )
}

export default ThemeToggle;