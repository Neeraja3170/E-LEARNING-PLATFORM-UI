// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Accordion functionality for course curriculum
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle('active');
        
        // Close other open accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

// Sample course data for dynamic loading
const courses = [
    {
        id: 1,
        title: "The Complete Web Developer Course",
        instructor: "John Smith",
        thumbnail: "https://via.placeholder.com/300x200",
        rating: 4.8,
        students: 5320,
        duration: "30 hours",
        level: "Beginner",
        category: "web"
    },
    {
        id: 2,
        title: "Mobile App Development with Flutter",
        instructor: "Emily Johnson",
        thumbnail: "https://via.placeholder.com/300x200",
        rating: 4.7,
        students: 3245,
        duration: "25 hours",
        level: "Intermediate",
        category: "mobile"
    },
    {
        id: 3,
        title: "Data Science and Machine Learning",
        instructor: "Michael Brown",
        thumbnail: "https://via.placeholder.com/300x200",
        rating: 4.9,
        students: 4123,
        duration: "40 hours",
        level: "Advanced",
        category: "data"
    },
    {
        id: 4,
        title: "UI/UX Design Fundamentals",
        instructor: "Sarah Wilson",
        thumbnail: "https://via.placeholder.com/300x200",
        rating: 4.6,
        students: 2876,
        duration: "20 hours",
        level: "Beginner",
        category: "design"
    }
];

// Function to render courses
function renderCourses(coursesToRender, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = '';
    
    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.thumbnail}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>By ${course.instructor}</p>
                <div class="course-meta">
                    <span><i class="fas fa-star"></i> ${course.rating} (${Math.floor(course.students/1000)}k)</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                </div>
            </div>
        `;
        courseCard.addEventListener('click', () => {
            window.location.href = `course-detail.html?id=${course.id}`;
        });
        container.appendChild(courseCard);
    });
}

// Render featured courses on homepage
if (document.querySelector('.featured-courses .course-grid')) {
    renderCourses(courses.slice(0, 3), '.featured-courses .course-grid');
}

// Render all courses on courses page
if (document.querySelector('.course-listing .course-grid')) {
    renderCourses(courses, '.course-listing .course-grid');
}

// Filter functionality
if (document.getElementById('category-filter')) {
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    
    function filterCourses() {
        const category = categoryFilter.value;
        const level = levelFilter.value;
        
        let filteredCourses = [...courses];
        
        if (category !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.category === category);
        }
        
        if (level !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === level);
        }
        
        renderCourses(filteredCourses, '.course-listing .course-grid');
    }
    
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
}

// Load course details based on URL parameter
if (window.location.pathname.includes('course-detail.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (courseId) {
        const course = courses.find(c => c.id === parseInt(courseId));
        if (course) {
            document.title = `${course.title} - LearnHub`;
            document.querySelector('.course-info h1').textContent = course.title;
        }
    }
}

// Sample dashboard data
if (window.location.pathname.includes('dashboard.html')) {
    // Render enrolled courses
    const enrolledCourses = [
        {
            ...courses[0],
            progress: 65
        },
        {
            ...courses[1],
            progress: 30
        }
    ];
    
    const progressContainer = document.querySelector('.course-progress-grid');
    if (progressContainer) {
        progressContainer.innerHTML = '';
        
        enrolledCourses.forEach(course => {
            const progressCard = document.createElement('div');
            progressCard.className = 'course-progress-card';
            progressCard.innerHTML = `
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="course-progress-info">
                    <h3>${course.title}</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${course.progress}%;"></div>
                        <span>${course.progress}% Complete</span>
                    </div>
                    <a href="course-detail.html?id=${course.id}" class="btn btn-small">Continue Learning</a>
                </div>
            `;
            progressContainer.appendChild(progressCard);
        });
    }
    
    // Render recommended courses
    renderCourses(courses.slice(2), '.dashboard-section:last-child .course-grid');
}