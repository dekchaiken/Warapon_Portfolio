// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Typing effect for role
const roles = [
    "Full Stack Developer & Security Analyst",
    "Computer Engineering Graduate",
    "Cybersecurity Enthusiast"
];

let currentRoleIndex = 0;
const typingText = document.getElementById('typing-text');

function typeRole() {
    const role = roles[currentRoleIndex];
    let i = 0;
    typingText.textContent = '';
    
    function type() {
        if (i < role.length) {
            typingText.textContent += role[i];
            i++;
            setTimeout(type, 50);
        } else {
            setTimeout(() => {
                deleteRole();
            }, 2000);
        }
    }
    
    type();
}

function deleteRole() {
    let text = typingText.textContent;
    
    function deleteChar() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            typingText.textContent = text;
            setTimeout(deleteChar, 30);
        } else {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }
    
    deleteChar();
}

// Start typing effect
typeRole();

// Handle project cards
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-card-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-card-image">
            </div>
            <h3 class="project-card-title">
                <span class="tag">&lt;</span>${project.title}<span class="tag">/&gt;</span>
            </h3>
            <p class="project-card-description">
                <span class="comment-delimit">//</span> ${project.description}
            </p>
            <div class="project-card-tags">
                ${project.technologies.map(tech => {
                    const tagClass = tech.toLowerCase().includes('js') ? 'js' :
                                   tech.toLowerCase().includes('python') ? 'python' :
                                   tech.toLowerCase().includes('css') ? 'css' : 'node';
                    return `<span class="project-card-tag ${tagClass}">${tech}</span>`;
                }).join('')}
            </div>
            <div class="project-card-links">
                ${project.github ? `
                    <a href="${project.github}" class="project-card-link" target="_blank">
                        <img src="assets/icons/github.svg" alt="GitHub">
                        View Code
                    </a>
                ` : ''}
                ${project.demo ? `
                    <a href="${project.demo}" class="project-card-link" target="_blank">
                        <img src="assets/icons/external-link.svg" alt="Demo">
                        Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Initialize project grid if it exists
const projectGrid = document.getElementById('featured-project-grid');
if (projectGrid && window.portfolioData) {
    const featuredProjects = window.portfolioData.projects.slice(0, 3);
    projectGrid.innerHTML = featuredProjects.map(project => createProjectCard(project)).join('');
}

// Handle mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = mobileMenuBtn.querySelector('.icon-menu');
const closeIcon = mobileMenuBtn.querySelector('.icon-close');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.style.display = menuIcon.style.display === 'none' ? 'block' : 'none';
    closeIcon.style.display = closeIcon.style.display === 'none' ? 'block' : 'none';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Handle smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavOnScroll() {
    // Get all sections
    const sections = document.querySelectorAll('section.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get current scroll position
    const scrollPosition = window.scrollY;
    
    // Add a small offset to account for the navbar height
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const scrollOffset = navbarHeight + 50; // Additional 50px buffer
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - scrollOffset;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Get the corresponding nav link
            const sectionId = section.getAttribute('id');
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Handle tab close buttons (just for visual effect - doesn't actually close tabs)
function setupTabCloseButtons() {
    const tabCloseButtons = document.querySelectorAll('.tab-close');
    
    tabCloseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // We're not actually closing tabs, just showing a console message
            console.log('Tab close clicked (visual effect only)');
        });
    });
}

// Call the setup function when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupTabCloseButtons);

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavOnScroll);

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavOnScroll();
});