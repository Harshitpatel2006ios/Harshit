document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Function to set the dark mode state
    const setDarkMode = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '☀️ Light Mode'; // Change text to Light Mode
            }
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '🌙 Dark Mode'; // Change text back to Dark Mode
            }
        }
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    };

    // Load saved preference from localStorage
    const savedDarkModePreference = localStorage.getItem('darkMode');
    if (savedDarkModePreference === 'true') {
        setDarkMode(true);
    } else {
        setDarkMode(false); // Ensure button text is correct on initial load if not dark
    }

    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Get current state and toggle it
            const isCurrentlyDarkMode = body.classList.contains('dark-mode');
            setDarkMode(!isCurrentlyDarkMode);
        });
    }

    // --- Optional: Hero Section Carousel Logic (if you intend to make it dynamic) ---
    // Currently, your hero section is static HTML. If you were to implement
    // a dynamic carousel, the logic would go here.
    // For now, the direct styles in HTML for the hero section are fine.

});