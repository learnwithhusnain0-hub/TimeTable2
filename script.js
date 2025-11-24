// Main JavaScript for Allied School Timetable System

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize application data
function initializeApp() {
    // Initialize default data if not exists
    if (!localStorage.getItem('appInitialized')) {
        initializeDefaultData();
        localStorage.setItem('appInitialized', 'true');
    }
    
    // Add animations to elements
    animateElements();
}

// Initialize default timetable data
function initializeDefaultData() {
    const defaultData = {
        'class1': {
            description: 'Beginner level courses and foundational learning',
            monfri: [
                { time: '08:00 - 08:45', subject: 'English', teacher: 'Ms. Sarah', room: '101' },
                { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mr. Ahmed', room: '102' },
                { time: '09:30 - 10:15', subject: 'Science', teacher: 'Ms. Fatima', room: 'Lab 1' },
                { time: '10:15 - 10:30', subject: 'Break', teacher: '-', room: 'Playground' },
                { time: '10:30 - 11:15', subject: 'Urdu', teacher: 'Mr. Ali', room: '101' },
                { time: '11:15 - 12:00', subject: 'Art', teacher: 'Ms. Amina', room: 'Art Room' }
            ],
            saturday: [
                { time: '08:00 - 08:45', subject: 'Quran', teacher: 'Mr. Hassan', room: '101' },
                { time: '08:45 - 09:30', subject: 'General Knowledge', teacher: 'Ms. Sara', room: '102' },
                { time: '09:30 - 10:15', subject: 'Physical Education', teacher: 'Mr. Rizwan', room: 'Ground' },
                { time: '10:15 - 10:30', subject: 'Break', teacher: '-', room: 'Playground' },
                { time: '10:30 - 11:15', subject: 'Computer', teacher: 'Ms. Sana', room: 'Lab' },
                { time: '11:15 - 12:00', subject: 'Library', teacher: 'Mr. Farhan', room: 'Library' }
            ],
            teachers: [
                { name: 'Ms. Sarah', subject: 'English', email: 'sarah@alliedschool.edu' },
                { name: 'Mr. Ahmed', subject: 'Mathematics', email: 'ahmed@alliedschool.edu' },
                { name: 'Ms. Fatima', subject: 'Science', email: 'fatima@alliedschool.edu' },
                { name: 'Mr. Ali', subject: 'Urdu', email: 'ali@alliedschool.edu' },
                { name: 'Ms. Amina', subject: 'Art', email: 'amina@alliedschool.edu' }
            ]
        }
        // Add more default data for other classes as needed
    };

    // Save default data to localStorage
    Object.keys(defaultData).forEach(classId => {
        localStorage.setItem(`class${classId}Data`, JSON.stringify(defaultData[classId]));
    });
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to interactive elements
    document.querySelectorAll('.class-card, .feature-card, .action-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Animate elements on page load
function animateElements() {
    const animatedElements = document.querySelectorAll('.class-card, .feature-card, .action-card');
    
    animatedElements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
}

// Utility function to get class data
function getClassData(classId) {
    return JSON.parse(localStorage.getItem(`class${classId}Data`)) || null;
}

// Utility function to save class data
function saveClassData(classId, data) {
    localStorage.setItem(`class${classId}Data`, JSON.stringify(data));
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
