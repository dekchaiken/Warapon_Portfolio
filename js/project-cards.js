const projects = [
    {
        id: 'customer-tracking',
        title: 'Customer Work Tracking System',
        description: 'Built a real-time tracking system with automated reporting, interactive charts, and user permission management. Reduced tracking time by 40% using HTML5, CSS3, JavaScript, and Chart.js',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
        preview: `class CustomerTracking {
    constructor() {
        this.reports = [];
        this.charts = new ChartManager();
    }

    async generateReport() {
        const data = await this.fetchData();
        return this.processData(data);
    }

    updateDashboard() {
        this.charts.render();
        this.notifyUsers();
    }
}`
    },
    {
        id: 'equipment-auth',
        title: 'Equipment Authentication System',
        description: 'Designed and developed a computer unlocking program using RFID scanning and password authentication, integrated with equipment-specific certificates and expiration dates.',
        technologies: ['Python', 'MySQL'],
        preview: `class EquipmentAuth:
    def __init__(self):
        self.rfid_scanner = RFIDScanner()
        self.db = Database()
    
    def authenticate(self, rfid_code):
        if self.verify_rfid(rfid_code):
            return self.check_expiration()
        return False`
    },
    {
        id: 'weather-monitoring',
        title: 'Intelligent Weather Monitoring System',
        description: 'Developed an IoT-based solution for real-time weather tracking and flood prediction using Raspberry Pi, Node-RED, and various sensors.',
        technologies: ['Raspberry Pi', 'Node-RED', 'MongoDB', 'Grafana'],
        preview: `const WeatherSystem = {
    sensors: new SensorManager(),
    database: new MongoDB(),
    
    async collectData() {
        const readings = await this.sensors.read();
        await this.database.store(readings);
        this.analyzePredictions();
    }
}`
    },
    {
        id: 'ecommerce',
        title: 'E-commerce Website',
        description: 'PHP-powered online store with user/admin functionalities and order tracking.',
        technologies: ['PHP', 'MySQL', 'JavaScript'],
        preview: `class EcommerceStore {
    private $db;
    private $cart;
    
    public function processOrder($order) {
        $this->validateOrder($order);
        $this->updateInventory();
        $this->notifyCustomer();
    }
}`
    },
    {
        id: 'manga-reader',
        title: 'Mobile Manga Reader',
        description: 'Cross-platform comic reading app developed using Flutter.',
        technologies: ['Flutter', 'Dart', 'Firebase'],
        preview: `class MangaReader extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            home: MangaLibrary(),
            theme: ThemeData.dark(),
        );
    }
}`
    }
];

function createProjectCards() {
    const container = document.querySelector('.projects-container');
    if (!container) return;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="editor-header">
                <div class="editor-dot red"></div>
                <div class="editor-dot yellow"></div>
                <div class="editor-dot green"></div>
                <div class="editor-title">${project.title}</div>
            </div>
            <div class="editor-content">
                ${formatCodePreview(project.preview)}
            </div>
        `;
        card.addEventListener('click', () => showProjectModal(project));
        container.appendChild(card);
    });
}

function formatCodePreview(code) {
    return code.split('\n').map((line, index) => `
        <div class="code-line">
            <span class="line-number">${index + 1}</span>
            <span class="code-text">${line}</span>
        </div>
    `).join('');
}

function showProjectModal(project) {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-text typing-animation">Initializing ${project.title}...</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    loadingOverlay.classList.add('active');

    setTimeout(() => {
        loadingOverlay.remove();
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${project.description}</p>
                    <div class="technologies">
                        <h3>Technologies Used:</h3>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="code-preview">
                        <h3>Code Preview:</h3>
                        <pre><code>${project.preview}</code></pre>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }, 1500);
}

document.addEventListener('DOMContentLoaded', createProjectCards); 