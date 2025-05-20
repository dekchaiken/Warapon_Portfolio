// Project Data
const projects = [
    {
        id: 1,
        title: "Work Tracking System",
        description: "Real-time tracking system with automated reporting, interactive charts, and user permission management. Reduced tracking time by 40%.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
        image: "assets/images/project-thumbnails/work-tracking.jpg",
        github: "#",
        demo: "#"
    },
    {
        id: 2,
        title: "Weather Monitoring System",
        description: "IoT-based solution for real-time weather tracking and flood prediction using Raspberry Pi, Node-RED, and various sensors.",
        technologies: ["Python", "Node-RED", "MongoDB", "Grafana", "LINE Notify"],
        image: "assets/images/project-thumbnails/weather-monitoring.jpg",
        github: "#",
        demo: "#"
    },
    {
        id: 3,
        title: "Equipment Authentication System",
        description: "Computer unlocking program using RFID scanning and password authentication, integrated with equipment-specific certificates.",
        technologies: ["Python", "MySQL", "RFID"],
        image: "assets/images/project-thumbnails/auth-system.jpg",
        github: "#",
        demo: "#"
    },
    {
        id: 4,
        title: "E-commerce Website",
        description: "PHP-powered online store with user/admin functionalities and order tracking.",
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        image: "assets/images/project-thumbnails/ecommerce.jpg",
        github: "#",
        demo: "#"
    },
    {
        id: 5,
        title: "Mobile Manga Reader",
        description: "Cross-platform comic reading app developed using Flutter.",
        technologies: ["Flutter", "Dart", "Firebase"],
        image: "assets/images/project-thumbnails/manga-reader.jpg",
        github: "#",
        demo: "#"
    }
];

// Experience Data
const experience = [
    {
        company: "National Telecom Public Company Limited",
        position: "Cyber Security Operations Center (Security analyst : Tier 1)",
        period: "Nov 2024 - Present",
        responsibilities: [
            "Analyzed and monitored security logs from various systems to identify potential cyber threats",
            "Detected and responded to security incidents in real-time using SIEM tools",
            "Generated reports and alerts for customers when suspicious activities or potential threats were identified"
        ]
    },
    {
        company: "Infineon Technologies (Thailand) Limited",
        position: "Intern (Wafer Test Engineer)",
        period: "Jun 2024 - Aug 2024",
        responsibilities: [
            "Conducted a feasibility study on equipment communication protocols using SECS/GEM and Modbus",
            "Developed Wafer Test tester authentication systems using Python, RFID technology and password authentication",
            "Reference: Chaiwat Sittisombut, Wafer Test, Sr. Staff Engineer (+66 82 654 6441)"
        ]
    },
    {
        company: "Cal-Comp Electronics (Thailand) Public Company Limited",
        position: "Electronic Repair Technician",
        period: "Sep 2021 - Dec 2021",
        responsibilities: [
            "Diagnosed and repaired defective circuit boards",
            "Documented issues and resolutions by model",
            "Performed functional tests on boards to identify and rectify problems"
        ]
    }
];

// Skills Data
const skills = {
    languages: ["Thai", "English"],
    programming: ["C", "C#", "Python", "Java", "HTML", "CSS", "JavaScript", "Solidity", "Dart"],
    software: ["Android Studio", "Arduino", "Microsoft365", "MSSQL", "IBM Qradar"],
    hardware: ["Raspberry Pi", "ESP32", "ESP8266"]
};

// Education Data
const education = {
    school: "Dhurakij Pundit University",
    degree: "Computer Engineering",
    year: "2024",
    achievements: [
        "Outstanding academic performance in Computer Engineering (2nd Year)"
    ]
};

// Export data
window.portfolioData = {
    projects,
    experience,
    skills,
    education
}; 