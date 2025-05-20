// Project data
const projects = {
    tracking: {
        title: "Customer Work Tracking System",
        description: "Built a real-time tracking system with automated reporting, interactive charts, and user permission management. Reduced tracking time by 40% using HTML5, CSS3, JavaScript, and Chart.js",
        techStack: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
        features: [
            "Real-time tracking and monitoring",
            "Automated reporting system",
            "Interactive data visualization",
            "User permission management",
            "40% reduction in tracking time"
        ]
    },
    auth: {
        title: "Equipment Authentication System",
        description: "Designed and developed a computer unlocking program using RFID scanning and password authentication, integrated with equipment-specific certificates and expiration dates. Implemented using Python and MySQL",
        techStack: ["Python", "MySQL", "RFID"],
        features: [
            "RFID-based authentication",
            "Password protection",
            "Equipment-specific certificates",
            "Expiration date management",
            "Secure access control"
        ]
    },
    weather: {
        title: "Intelligent Weather Monitoring System",
        description: "Developed an IoT-based solution for real-time weather tracking and flood prediction using Raspberry Pi, Node-RED, and various sensors. Implemented Grafana dashboard for data visualization and integrated LINE Notify for alerts. Utilized MongoDB for data storage and computer vision for sky imaging.",
        techStack: ["Raspberry Pi", "Node-RED", "MongoDB", "Grafana", "LINE Notify"],
        features: [
            "Real-time weather monitoring",
            "Flood prediction system",
            "Data visualization dashboard",
            "LINE notification alerts",
            "Computer vision for sky imaging"
        ]
    },
    ecommerce: {
        title: "E-commerce Website",
        description: "PHP-powered online store with user/admin functionalities and order tracking.",
        techStack: ["PHP", "MySQL"],
        features: [
            "User authentication",
            "Product management",
            "Shopping cart",
            "Order tracking",
            "Admin dashboard"
        ]
    },
    manga: {
        title: "Mobile Manga Reader",
        description: "Cross-platform comic reading app developed using Flutter.",
        techStack: ["Flutter", "Dart"],
        features: [
            "Cross-platform support",
            "Offline reading",
            "Bookmarking system",
            "Reading progress tracking",
            "Customizable reading experience"
        ]
    }
};

// Function to show modal with loading animation
function showModal(projectId) {
    console.log('showModal called with:', projectId);
    const modal = document.getElementById('project-modal');
    if (!modal) {
        console.error('Modal not found!');
        return;
    }

    // Show modal and loading screen
    modal.style.display = 'block';
    const loadingScreen = modal.querySelector('.loading-screen');
    const projectDetails = modal.querySelector('.project-details');
    
    if (loadingScreen && projectDetails) {
        loadingScreen.style.display = 'block';
        projectDetails.style.display = 'none';

        // Start progress bar animation
        const progress = modal.querySelector('.progress');
        if (progress) {
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = '100%';
            }, 100);
        }

        // Load project details after animation
        setTimeout(() => {
            loadProjectDetails(projectId);
        }, 2000);
    }
}

// Function to load project details
function loadProjectDetails(projectId) {
    console.log('Loading details for project:', projectId);
    const project = projects[projectId];
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    const modal = document.getElementById('project-modal');
    const loadingScreen = modal.querySelector('.loading-screen');
    const projectDetails = modal.querySelector('.project-details');

    const detailsHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech-stack">
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <h4>Key Features:</h4>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;

    projectDetails.innerHTML = detailsHTML;
    loadingScreen.style.display = 'none';
    projectDetails.style.display = 'block';
}

// Function to hide modal
function hideModal() {
    console.log('hideModal called');
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize when DOM is loaded
console.log('Projects.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded in projects.js');
    
    // Get all view buttons
    const buttons = document.querySelectorAll('.view-project-btn');
    console.log('Found buttons:', buttons.length);
    
    // Add click event to each button
    buttons.forEach(button => {
        console.log('Adding click event to button:', button.dataset.project);
        button.onclick = function(e) {
            e.preventDefault();
            console.log('Button clicked:', this.dataset.project);
            showModal(this.dataset.project);
        };
    });
    
    // Add close button event
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        console.log('Found close button');
        closeBtn.onclick = hideModal;
    }
    
    // Close on outside click
    window.onclick = function(e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) {
            hideModal();
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('project-modal');
            if (modal && modal.style.display === 'block') {
                hideModal();
            }
        }
    });
}); 