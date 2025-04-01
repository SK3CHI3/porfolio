// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll for all elements
    const animateElements = () => {
        // Elements to animate
        const elements = [
            '.section-title',
            '.about-text p',
            '.tech-stack',
            '.skills-list',
            '.education-card',
            '.skills-group',
            '.skill-pill',
            '.featured-project',
            '.mini-project',
            '.contact-content',
            '.work-tabs-container',
            '.tab-content'
        ];
        
        // Add animate-on-scroll class to all elements
        elements.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('animate-on-scroll');
                // Add staggered delay based on index
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
        
        // Set up the IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve once animated
                    // observer.unobserve(entry.target);
                } else {
                    // For repeated animations when scrolling up/down
                    // entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all animate-on-scroll elements
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    };
    
    // Add animation to social icons and email
    const socialIcons = document.querySelectorAll('.social-icons a');
    const emailLink = document.querySelector('.email-link');
    
    const addHoverAnimation = (elements) => {
        if (!elements || !elements.length) return;
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    // Add typing animation function
    const animateTyping = (element, text, speed = 100, delay = 0) => {
        if (!element) return;
        
        element.textContent = '';
        element.style.opacity = '1';
        
        // Only add typing class for tagline
        if (element.classList.contains('tagline')) {
            element.classList.add('typing');
        }
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        }, delay);
    };

    // Add typing animation function and setup
    const setupTypingAnimation = () => {
        // Get the elements
        const nameElement = document.querySelector('h1');
        const taglineElement = document.querySelector('.tagline');
        
        if (nameElement && taglineElement) {
            const originalName = nameElement.textContent;
            const originalTagline = taglineElement.textContent;
            
            // Initial typing animation on page load
            animateTyping(nameElement, originalName, 100, 400);
            
            // Wait for name to finish typing before starting tagline
            setTimeout(() => {
                animateTyping(taglineElement, originalTagline, 100, 0);
            }, originalName.length * 100 + 400 + 1000);
        }
        
        // Add typing animation for section titles on scroll
        const sectionTitles = document.querySelectorAll('.section-title');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const title = entry.target;
                    title.classList.add('typing');
                    
                    setTimeout(() => {
                        title.classList.remove('typing');
                    }, 3000);
                    
                    observer.unobserve(title);
                }
            });
        }, {
            threshold: 0.5
        });
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    };
    
    // Typing animation for loading screen
    function setupTypingAnimationLoading() {
        const typingText = document.getElementById('typingText');
        const loadingScreen = document.getElementById('loadingScreen');

        const texts = [
            'Hello mate?',
            'Welcome To The Matrix (**)',
        ];

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;

        function type() {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex <= 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    setTimeout(type, 1000); // Pause before typing next text
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex >= currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1000); // Pause before deleting
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }

        // Create matrix-style falling characters
        function createMatrixEffect() {
            const matrixBg = document.querySelector('.matrix-bg');
            
            for (let i = 0; i < 100; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-character';
                char.textContent = String.fromCharCode(48 + Math.random() * 10); // Random number 0-9
                
                const x = Math.random() * 100 + '%';
                const delay = Math.random() * 5000;
                
                char.style.left = x;
                char.style.animationDelay = delay + 'ms';
                
                matrixBg.appendChild(char);
            }
        }

        // Start the animation when the page loads
        createMatrixEffect();
        type();
        
        // Wait for the animation to complete before showing content
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
                // Start main page animations after loading screen is removed
                setTimeout(() => {
                    // Initialize main animations
                    animateElements();
                    // Initialize social icon animations
                    addHoverAnimation(socialIcons);
                    if (emailLink) {
                        emailLink.style.opacity = '1';
                        emailLink.style.transform = 'translateY(0)';
                    }
                    // Initialize main typing animation
                    setupTypingAnimation();
                }, 300); // Small delay to ensure smooth transition
            }, 500);
        }, 7000); // Loading screen animation time
    }
    
    setupTypingAnimationLoading();
    
    // Create floating animation for profile image
    const profileImage = document.querySelector('.about-image');
    if (profileImage) {
        profileImage.style.animation = 'float 8s ease-in-out infinite';
    }
    
    // First thing: ensure profile fallback is always visible
    const profileFallback = document.querySelector('.profile-fallback-container');
    if (profileFallback) {
        // Force the fallback to be visible with important styling
        profileFallback.setAttribute('style', 'opacity: 1 !important; visibility: visible !important;');
        // Apply the floating animation but keep visibility
        profileFallback.style.animation = 'float 8s ease-in-out infinite';
    }
    
    // Make sure this happens early in the loading process
    window.addEventListener('load', () => {
        if (profileFallback) {
            profileFallback.setAttribute('style', 'opacity: 1 !important; visibility: visible !important;');
        }
    });
    
    // Add scroll to top button
    const createScrollTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '&uarr;';
        button.className = 'scroll-top';
        button.style.display = 'none';
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
                button.style.opacity = '1';
            } else {
                button.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        button.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createScrollTopButton();
    
    // Add active state to nav items on scroll - improved version
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (sections.length && navItems.length) {
        const highlightNavOnScroll = () => {
            let current = '';
            let closestSection = null;
            let closestDistance = Number.MAX_VALUE;
            
            // Find the section closest to the top of the viewport
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                const sectionTop = section.getBoundingClientRect().top;
                const distance = Math.abs(sectionTop);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = sectionId;
                }
            });
            
            // Use the closest section as the current one
            current = closestSection;
            
            // Update active class on nav items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
                const navHref = navItem.getAttribute('href');
                if (navHref === `#${current}`) {
                    navItem.classList.add('active');
                }
            });
        };
        
        // Call the function on load and scroll
        window.addEventListener('scroll', highlightNavOnScroll);
        window.addEventListener('load', highlightNavOnScroll);
        window.addEventListener('resize', highlightNavOnScroll);
    }
    
    // Handle work section tabs
    const setupWorkTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Toggle active class on the button
                button.classList.toggle('active');
                
                // Toggle the corresponding content
                const tabId = button.getAttribute('data-tab');
                const content = document.getElementById(tabId);
                content.classList.toggle('active');
                
                // If no tabs are active, activate the first one
                const activeButtons = document.querySelectorAll('.tab-btn.active');
                if (activeButtons.length === 0) {
                    tabButtons[0].classList.add('active');
                    document.getElementById(tabButtons[0].getAttribute('data-tab')).classList.add('active');
                }
            });
        });
        
        // Set both tabs active by default
        tabButtons.forEach(button => {
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    };
    
    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Subtle parallax for sections
        document.querySelectorAll('.section').forEach((section, index) => {
            const yPos = -(scrolled * 0.03 * (index * 0.1 + 1));
            section.style.backgroundPosition = `50% ${yPos}px`;
        });
    });
    
    // Initialize all the JS functionality
    const init = () => {
        // Set up scroll-based navigation highlighting
        const highlightNavOnScroll = () => {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-item');
            
            let current = '';
            let closestSection = null;
            let closestDistance = Number.MAX_VALUE;
            
            // Find the section closest to the top of the viewport
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                const sectionTop = section.getBoundingClientRect().top;
                const distance = Math.abs(sectionTop);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = sectionId;
                }
            });
            
            // Use the closest section as the current one
            current = closestSection;
            
            // Update active class on nav items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
                const navHref = navItem.getAttribute('href');
                if (navHref === `#${current}`) {
                    navItem.classList.add('active');
                }
            });
        };
        
        // Set up animations when scrolling
        const setupAnimationOnScroll = () => {
            // Elements to animate
            const elements = [
                '.section-title',
                '.about-text p',
                '.education-card',
                '.skills-group',
                '.skill-pill',
                '.featured-project',
                '.mini-project',
                '.contact-content',
                '.tab-content'
            ];
            
            // Add animate-on-scroll class to all elements
            elements.forEach(selector => {
                document.querySelectorAll(selector).forEach((element, index) => {
                    element.classList.add('animate-on-scroll');
                    // Add staggered delay based on index
                    element.style.transitionDelay = `${index * 0.1}s`;
                });
            });
            
            // Set up the IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            });
            
            // Observe all animate-on-scroll elements
            document.querySelectorAll('.animate-on-scroll').forEach(element => {
                observer.observe(element);
            });
        };
        
        // Setup navigation behavior
        const setupNavigation = () => {
            // Add event listeners for smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70, // Account for navbar height
                            behavior: 'smooth'
                        });
                    }
                });
            });
        };
        
        // Setup scroll progress visualization
        const setupScrollProgress = () => {
            // Add scroll to top button
            const button = document.createElement('button');
            button.innerHTML = '&uarr;';
            button.className = 'scroll-top';
            button.style.display = 'none';
            document.body.appendChild(button);
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    button.style.display = 'block';
                    button.style.opacity = '1';
                } else {
                    button.style.opacity = '0';
                    setTimeout(() => {
                        if (window.pageYOffset <= 300) {
                            button.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        };
        
        // Setup parallax effect
        const setupParallaxEffect = () => {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                // Subtle parallax for sections
                document.querySelectorAll('.section').forEach((section, index) => {
                    const yPos = -(scrolled * 0.03 * (index * 0.1 + 1));
                    section.style.backgroundPosition = `50% ${yPos}px`;
                });
            });
        };
        
        // Typing animation and highlight effects
        const setupHighlightText = () => {
            // Find all elements with the highlight-text class
            const highlightElements = document.querySelectorAll('.highlight-text');
            
            // Remove animation styles and just keep the highlight
            if (highlightElements) {
                highlightElements.forEach(element => {
                    // Remove animation delays and animation attributes
                    element.removeAttribute('style');
                });
            }
        };
        
        // Typing animation for loading screen
        const setupLoadingScreen = () => {
            const typingText = document.getElementById('typingText');
            const loadingScreen = document.getElementById('loadingScreen');

            const texts = [
                'Hello mate?',
                'Welcome To The Matrix (**)',
            ];

            let currentTextIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            let deletingSpeed = 50;

            function type() {
                const currentText = texts[currentTextIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    
                    if (currentCharIndex <= 0) {
                        isDeleting = false;
                        currentTextIndex = (currentTextIndex + 1) % texts.length;
                        setTimeout(type, 1000); // Pause before typing next text
                    } else {
                        setTimeout(type, deletingSpeed);
                    }
                } else {
                    typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    
                    if (currentCharIndex >= currentText.length) {
                        isDeleting = true;
                        setTimeout(type, 1000); // Pause before deleting
                    } else {
                        setTimeout(type, typingSpeed);
                    }
                }
            }

            // Create matrix-style falling characters
            function createMatrixEffect() {
                const matrixBg = document.querySelector('.matrix-bg');
                
                for (let i = 0; i < 100; i++) {
                    const char = document.createElement('div');
                    char.className = 'matrix-character';
                    char.textContent = String.fromCharCode(48 + Math.random() * 10); // Random number 0-9
                    
                    const x = Math.random() * 100 + '%';
                    const delay = Math.random() * 5000;
                    
                    char.style.left = x;
                    char.style.animationDelay = delay + 'ms';
                    
                    matrixBg.appendChild(char);
                }
            }

            // Start the animation when the page loads
            createMatrixEffect();
            type();
            
            // Wait for the animation to complete before showing content
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                    // Add a small delay before starting main animations
                    setTimeout(() => {
                        animateElements();
                    }, 300); // Small delay to ensure smooth transition
                }, 500);
            }, 7000); // Loading screen animation time
        };

        // Setup scrollspy
        const setupScrollspy = () => {
            window.addEventListener('scroll', highlightNavOnScroll);
            window.addEventListener('load', highlightNavOnScroll);
            window.addEventListener('resize', highlightNavOnScroll);
        };
        
        // Run all setup functions
        setupScrollspy();
        setupNavigation();
        setupWorkTabs();
        setupHighlightText();
        setupParallaxEffect();
        setupScrollProgress();
        setupAnimationOnScroll();
        setupLoadingScreen();
    };
    
    init();
}); 