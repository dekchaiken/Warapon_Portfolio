// Custom cursor effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Make sure cursor elements exist before adding event listeners
if (cursor && cursorFollower) {
    // Initialize cursor visibility
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.5';
    
    // Track mouse movement with requestAnimationFrame for smoother performance
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Handle cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"], input, select, textarea, [onclick], .skills-list li');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5) rotate(45deg)';
            cursorFollower.style.transform = 'scale(1.2)';
            cursorFollower.setAttribute('data-hovering', 'true');
            cursorFollower.style.color = '#50fa7b'; // Green color on hover
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'rotate(45deg)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.removeAttribute('data-hovering');
            cursorFollower.style.color = 'var(--accent-color)';
        });
    });
    
    // Add typing effect when clicking
    document.addEventListener('mousedown', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(0.8) rotate(45deg)';
            cursorFollower.style.transform = 'scale(0.9)';
            cursorFollower.setAttribute('data-active', 'true');
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'rotate(45deg)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.removeAttribute('data-active');
        }
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
        // Calculate smooth movement with easing
        const easing = 0.2;
        
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;
        
        followerX += (mouseX - followerX) * (easing * 0.5);
        followerY += (mouseY - followerY) * (easing * 0.5);
        
        // Apply positions
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
const navbar = document.querySelector('#navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else if (currentScroll < lastScroll) {
        navbar.classList.add('scroll-up');
        navbar.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
const heroSection = document.querySelector('#hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Add slide-in class to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('slide-in');
    });
    
    // Add fade-in class to skills
    document.querySelectorAll('.skills-list li').forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
        skill.classList.add('fade-in');
    });
}); 