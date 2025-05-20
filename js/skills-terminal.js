// Skills Terminal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Skill data with detailed information
    const skillsData = {
        "Python": {
            name: "Python",
            proficiency: "สูง",
            description: "เชี่ยวชาญในการพัฒนา Backend, Scripting, Data Analysis และ Cybersecurity Tools.",
            expertise: ["Backend Development", "Data Analysis", "Automation", "Security Tools"],
            experience: "5+ ปี"
        },
        "JavaScript": {
            name: "JavaScript",
            proficiency: "สูง",
            description: "มีประสบการณ์ในการพัฒนา Frontend ด้วย Vanilla JS และ Framework/Libraries เช่น React.",
            expertise: ["Frontend Development", "DOM Manipulation", "Async Programming", "React"],
            experience: "4+ ปี"
        },
        "Java": {
            name: "Java",
            proficiency: "ปานกลาง",
            description: "พื้นฐานการเขียนโปรแกรมเชิงวัตถุ (OOP) และพัฒนาแอปพลิเคชันขนาดเล็ก.",
            expertise: ["OOP", "Basic Application Development"],
            experience: "2+ ปี"
        },
        "C": {
            name: "C",
            proficiency: "ปานกลาง",
            description: "พื้นฐานการเขียนโปรแกรมระดับต่ำ และ Microcontroller.",
            expertise: ["Low-level Programming", "Microcontroller Development"],
            experience: "2+ ปี"
        },
        "HTML5": {
            name: "HTML5",
            proficiency: "สูงมาก",
            description: "เชี่ยวชาญในการสร้างโครงสร้างเว็บ semantic และ Accessible.",
            expertise: ["Semantic Markup", "Accessibility", "Forms", "Multimedia"],
            experience: "5+ ปี"
        },
        "CSS3": {
            name: "CSS3",
            proficiency: "สูง",
            description: "เชี่ยวชาญในการออกแบบ responsive, Animation และการใช้ Preprocessors.",
            expertise: ["Responsive Design", "Animations", "Flexbox/Grid", "SASS/SCSS"],
            experience: "5+ ปี"
        },
        "React": {
            name: "React",
            proficiency: "สูง",
            description: "มีประสบการณ์ในการสร้าง Single Page Applications และ Component-based UI.",
            expertise: ["Component Architecture", "State Management", "Hooks", "Context API"],
            experience: "3+ ปี"
        },
        "Git": {
            name: "Git",
            proficiency: "สูงมาก",
            description: "เชี่ยวชาญในการใช้งาน Git สำหรับ Version Control และการทำงานร่วมกับทีม.",
            expertise: ["Version Control", "Branching Strategies", "Merge Conflict Resolution", "CI/CD Integration"],
            experience: "5+ ปี"
        },
        "Docker": {
            name: "Docker",
            proficiency: "ปานกลาง",
            description: "มีประสบการณ์ในการสร้างและจัดการ Docker Containers.",
            expertise: ["Containerization", "Docker Compose", "Basic Orchestration"],
            experience: "2+ ปี"
        },
        "Linux": {
            name: "Linux",
            proficiency: "สูง",
            description: "คุ้นเคยกับการใช้งาน Command Line และระบบปฏิบัติการ Linux.",
            expertise: ["Command Line", "Shell Scripting", "System Administration", "Server Management"],
            experience: "4+ ปี"
        },
        "Security Analysis": {
            name: "Security Analysis",
            proficiency: "สูงมาก",
            description: "เชี่ยวชาญในการวิเคราะห์ Log, ตรวจจับภัยคุกคาม และ Incident Response.",
            expertise: ["Log Analysis", "Threat Detection", "Incident Response", "Security Monitoring"],
            experience: "3+ ปี"
        },
        "Network Security": {
            name: "Network Security",
            proficiency: "สูง",
            description: "มีความรู้พื้นฐานเกี่ยวกับ Network Security Concepts และ Tools.",
            expertise: ["Firewall Configuration", "VPN Setup", "Network Monitoring", "Traffic Analysis"],
            experience: "3+ ปี"
        },
        "SIEM Tools": {
            name: "SIEM Tools",
            proficiency: "สูง",
            description: "มีประสบการณ์ในการใช้งาน SIEM Platforms สำหรับ Monitoring และ Alerting.",
            expertise: ["Log Collection", "Alert Configuration", "Dashboard Creation", "Correlation Rules"],
            experience: "3+ ปี"
        }
    };

    // Get DOM elements
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillDetailsContainer = document.getElementById('skill-details-container');
    
    // Track the currently active skill
    let activeSkill = null;
    
    // Add event listeners to all skill tags
    skillTags.forEach(tag => {
        // Show details on hover
        tag.addEventListener('mouseenter', function() {
            const skillName = this.getAttribute('data-skill');
            showSkillDetails(skillName);
            activeSkill = skillName;
        });
        
        // Click to keep details open
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const skillName = this.getAttribute('data-skill');
            showSkillDetails(skillName, true); // true = pinned
            activeSkill = skillName;
        });
    });
    
    // Hide details when mouse leaves the skills section (unless pinned)
    document.querySelector('.skills-terminal').addEventListener('mouseleave', function() {
        if (!skillDetailsContainer.classList.contains('pinned')) {
            hideSkillDetails();
        }
    });
    
    // Function to show skill details
    function showSkillDetails(skillName, pinned = false) {
        // Get skill data
        const skill = skillsData[skillName];
        if (!skill) return;
        
        // Create skill details HTML
        const detailsHTML = `
            <div class="skill-detail-header">
                <span class="skill-detail-title">${skill.name}</span>
                <span class="skill-detail-close" onclick="closeSkillDetails()">×</span>
            </div>
            <div class="skill-detail-content">
                <div class="skill-detail-item">
                    <span class="detail-label">Proficiency:</span>
                    <span class="detail-value proficiency">${skill.proficiency}</span>
                </div>
                <div class="skill-detail-item">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">${skill.experience}</span>
                </div>
                <div class="skill-detail-item">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${skill.description}</span>
                </div>
                <div class="skill-detail-item">
                    <span class="detail-label">Expertise:</span>
                    <span class="detail-value">
                        ${skill.expertise.map(exp => `<span class="expertise-item">• ${exp}</span>`).join('')}
                    </span>
                </div>
            </div>
        `;
        
        // Update and show the details container
        skillDetailsContainer.innerHTML = detailsHTML;
        skillDetailsContainer.classList.add('visible');
        
        // Add or remove pinned class based on parameter
        if (pinned) {
            skillDetailsContainer.classList.add('pinned');
        } else {
            skillDetailsContainer.classList.remove('pinned');
        }
    }
    
    // Function to hide skill details
    function hideSkillDetails() {
        skillDetailsContainer.classList.remove('visible');
        skillDetailsContainer.classList.remove('pinned');
        activeSkill = null;
    }
    
    // Function to close skill details (for the close button)
    window.closeSkillDetails = function() {
        hideSkillDetails();
    };
});
