// Fixed navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const fixedNavbar = document.getElementById('fixedNavbar');
    const heroSection = document.querySelector('.hero');
    let heroHeight = heroSection.offsetHeight;
    
    // Function to handle scroll
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const shouldShowNavbar = scrollPosition > heroHeight * 0.2; // Show after scrolling 30% of hero height
        
        if (shouldShowNavbar) {
            fixedNavbar.classList.add('visible');
        } else {
            fixedNavbar.classList.remove('visible');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Recalculate hero height on window resize
    window.addEventListener('resize', function() {
        heroHeight = heroSection.offsetHeight;
    });
    
    // Initial check
    handleScroll();

    // Sidebar functionality
    const navMenu = document.querySelector('.nav-menu');
    const slideoutMenu = document.querySelector('.slideout-menu');
    const blackout = document.querySelector('.blackout');
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const closeIcon = document.querySelector('.close-icon');
    const menuHeader = document.querySelector('.menu-header');
    
    // Function to open sidebar
    function openSidebar() {
        navMenu.classList.add('open');
        slideoutMenu.classList.add('open');
        blackout.classList.add('visible');
        blackout.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close sidebar
    function closeSidebar() {
        navMenu.classList.remove('open');
        slideoutMenu.classList.remove('open');
        blackout.classList.remove('visible');
        setTimeout(() => {
            blackout.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Event listeners
    if (menuToggles.length > 0) {
        menuToggles.forEach(menuToggle => {
            menuToggle.addEventListener('click', openSidebar);
        });
    }
    
    // Add event listener to both close icon and menu header
    if (closeIcon) {
        closeIcon.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
    }
    
    if (menuHeader) {
        menuHeader.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
    }
    
    if (blackout) {
        blackout.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking anchor links (for smooth scrolling)
    const anchorLinks = document.querySelectorAll('.anchor-links, .company-links');
    anchorLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Weight slider functionality
    const weightSlider = document.getElementById('weightSlider');
    const currentWeightDisplay = document.getElementById('currentWeight');
    const potentialWeightDisplay = document.getElementById('potentialWeight');
    let updateTimeout;

    if (weightSlider && currentWeightDisplay && potentialWeightDisplay) {
        // Function to calculate weight loss potential (roughly 23% of current weight)
        function calculatePotential(currentWeight) {
            const potential = Math.round(currentWeight * 0.23);
            return Math.max(10, Math.min(potential, 100)); // Keep between 10-100 lbs
        }

        // Function to animate the potential weight change
        function animatePotentialChange(newPotential) {
            const currentPotential = parseInt(potentialWeightDisplay.textContent);
            const difference = newPotential - currentPotential;
            const steps = 20;
            const stepSize = difference / steps;
            let currentStep = 0;

            // Add updating class for animation
            potentialWeightDisplay.classList.add('updating');

            const animation = setInterval(() => {
                currentStep++;
                const newValue = Math.round(currentPotential + (stepSize * currentStep));
                potentialWeightDisplay.textContent = newValue;

                if (currentStep >= steps) {
                    clearInterval(animation);
                    potentialWeightDisplay.textContent = newPotential;
                    // Remove updating class after animation
                    setTimeout(() => {
                        potentialWeightDisplay.classList.remove('updating');
                    }, 200);
                }
            }, 25); // 25ms * 20 steps = 500ms total animation
        }

        // Function to update slider track fill
        function updateSliderTrack() {
            const value = ((weightSlider.value - weightSlider.min) / (weightSlider.max - weightSlider.min)) * 100;
            weightSlider.style.background = `linear-gradient(to right, var(--wood) 0%, var(--wood) ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`;
        }

        // Update current weight display immediately and track fill
        weightSlider.addEventListener('input', function() {
            const currentWeight = this.value;
            currentWeightDisplay.textContent = currentWeight;
            
            // Update slider track fill
            updateSliderTrack();

            // Clear existing timeout
            clearTimeout(updateTimeout);

            // Set new timeout for potential weight update (2 seconds delay)
            updateTimeout = setTimeout(() => {
                const newPotential = calculatePotential(parseInt(currentWeight));
                animatePotentialChange(newPotential);
            }, 500);
        });

        // Initialize with default values
        const initialWeight = parseInt(weightSlider.value);
        const initialPotential = calculatePotential(initialWeight);
        potentialWeightDisplay.textContent = initialPotential;
        updateSliderTrack(); // Initialize track fill
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Weight Goal Selection functionality
    const weightGoalOptions = document.querySelectorAll('.weight-goal-option');
    
    weightGoalOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            weightGoalOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
        });
    });
});