document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check if the user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️"; // Change to sun icon
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");

        // Save theme preference in localStorage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");

        // Update button icon
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    });
});
