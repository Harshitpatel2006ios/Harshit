
        document.addEventListener('DOMContentLoaded', () => {
            const carouselContainer = document.getElementById('carouselContainer');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const paginationDots = document.getElementById('paginationDots');
            const carouselItems = Array.from(carouselContainer.children); // Get all direct children (slides)
            const totalSlides = carouselItems.length;
            let currentIndex = 0;
            let autoSlideInterval;

            /**
             * Updates the carousel to display the current slide.
             * It adjusts the `transform` property of the carousel container
             * to slide the appropriate item into view.
             */
            const updateCarousel = () => {
                const offset = -currentIndex * 100; // Calculate offset in percentage
                carouselContainer.style.transform = `translateX(${offset}%)`;
                updatePaginationDots(); // Update dots to reflect current slide
            };

            /**
             * Creates and appends pagination dots based on the number of slides.
             * Each dot is clickable and navigates to its corresponding slide.
             */
            const createPaginationDots = () => {
                paginationDots.innerHTML = ''; // Clear existing dots
                carouselItems.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot', 'w-3', 'h-3', 'rounded-full', 'bg-gray-400', 'cursor-pointer');
                    // Add event listener for clicking dots
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                        resetAutoSlide(); // Reset auto-slide on manual interaction
                    });
                    paginationDots.appendChild(dot);
                });
                updatePaginationDots(); // Set initial active dot
            };

            /**
             * Updates the active state of pagination dots.
             * The dot corresponding to the `currentIndex` gets an 'active' class.
             */
            const updatePaginationDots = () => {
                Array.from(paginationDots.children).forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            /**
             * Moves the carousel to the next slide.
             * Wraps around to the first slide if at the end.
             */
            const goToNextSlide = () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            };

            /**
             * Moves the carousel to the previous slide.
             * Wraps around to the last slide if at the beginning.
             */
            const goToPrevSlide = () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            };

            /**
             * Starts the automatic sliding of the carousel.
             * Slides every 5 seconds.
             */
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(goToNextSlide, 3000); // Change slide every 5 seconds
            };

            /**
             * Resets the automatic sliding timer.
             * Called after manual navigation to prevent immediate auto-slide.
             */
            const resetAutoSlide = () => {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            };

            // Event Listeners for navigation buttons
            nextBtn.addEventListener('click', () => {
                goToNextSlide();
                resetAutoSlide(); // Reset auto-slide on manual interaction
            });

            prevBtn.addEventListener('click', () => {
                goToPrevSlide();
                resetAutoSlide(); // Reset auto-slide on manual interaction
            });

            // Initial setup on page load
            createPaginationDots();
            updateCarousel(); // Ensure initial state is correct
            startAutoSlide(); // Start auto-sliding

            // Optional: Pause auto-slide on hover for better user control
            carouselContainer.parentElement.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            carouselContainer.parentElement.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        });

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const toggleBtn = document.getElementById('darkModeToggle');

    // Check if toggleBtn exists before adding event listener
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Optionally update button text/icon
            if (document.body.classList.contains('dark-mode')) {
                toggleBtn.textContent = '☀️ Light Mode';
            } else {
                toggleBtn.textContent = '🌙 Dark Mode';
            }
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        // Close nav menu when a link is clicked (for smooth scrolling)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simple smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.header')?.offsetHeight || 0), // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

});