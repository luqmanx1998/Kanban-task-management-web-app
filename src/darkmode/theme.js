// theme.js
export function toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        return "light";
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        return "dark";
    }
}