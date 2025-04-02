import {useState,useEffect} from "react";

export const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        //Check for saved user preference or sytem preference
        const savedMode = localStorage.getItem("darkMode");
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialMode = savedMode ? JSON.parse(savedMode) : prefersDarkMode;
        setIsDarkMode(initialMode);
        document.documentElement.setAttribute('data-theme', initialMode ? 'dark' : '');
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : '');
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    }
    return (
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};