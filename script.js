// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Add visualization section to HTML dynamically
    addVisualizationSection();
    
    // Initialize charts when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('chart-container')) {
                initializeCharts();
                observer.unobserve(entry.target);
            }
        });
    });

    // Observe chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        observer.observe(container);
    });
});

function addVisualizationSection() {
    const visualizationHTML = `
    <section id="visualizations" class="visualization-section">
        <div class="container">
            <h2 class="section-title">Project Impact & Analytics</h2>
            <div class="charts-grid">
                <div class="chart-container">
                    <h3>Project Performance Metrics</h3>
                    <canvas id="performanceChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Skills Proficiency</h3>
                    <canvas id="skillsChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Technology Stack Distribution</h3>
                    <canvas id="techChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Impact Over Time</h3>
                    <canvas id="impactChart"></canvas>
                </div>
            </div>
        </div>
    </section>
    `;
    
    // Insert after projects section
    const projectsSection = document.getElementById('projects');
    projectsSection.insertAdjacentHTML('afterend', visualizationHTML);
    
    // Add navigation link
    const navMenu = document.querySelector('.nav-menu');
    const visualizationNavItem = document.createElement('li');
    visualizationNavItem.innerHTML = '<a href="#visualizations" class="nav-link">Analytics</a>';
    
    // Insert after projects nav item
    const projectsNavItem = Array.from(navMenu.children).find(li => 
        li.querySelector('a').getAttribute('href') === '#projects'
    );
    projectsNavItem.insertAdjacentElement('afterend', visualizationNavItem);
}

function initializeCharts() {
    // Performance Metrics Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Error Reduction', 'Efficiency Improvement', 'Model Accuracy', 'Performance Boost'],
            datasets: [{
                label: 'Improvement %',
                data: [45, 85, 87, 25],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(147, 51, 234, 0.8)'
                ],
                borderColor: [
                    'rgba(37, 99, 235, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(251, 146, 60, 1)',
                    'rgba(147, 51, 234, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Skills Proficiency Chart
    const skillsCtx = document.getElementById('skillsChart').getContext('2d');
    new Chart(skillsCtx, {
        type: 'radar',
        data: {
            labels: ['Python', 'Machine Learning', 'Deep Learning', 'N