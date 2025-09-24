// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add fade-in animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .download-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add click event to screenshot for demo
    const screenshot = document.querySelector('.screenshot-container');
    if (screenshot) {
        screenshot.addEventListener('click', function() {
            alert('Demo functionality - In the full extension, this would show a live demo!');
        });
    }
    
    // Add parallax effect to hero banner
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-banner');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for buttons
    const downloadBtns = document.querySelectorAll('.btn-primary');
    downloadBtns.forEach(btn => {
        if (!btn.onclick) { // Don't override existing onclick
            btn.addEventListener('click', function(e) {
                if (this.textContent.includes('Download') && this.id !== 'direct-download-hero' && this.id !== 'direct-download-section') {
                    e.preventDefault();
                    showDownloadModal();
                }
            });
        }
    });
    
    // Add pulse animation to coming soon badges
    const comingSoonBadges = document.querySelectorAll('.coming-soon');
    comingSoonBadges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });
});

// Show download modal function
function showDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download Pump.Fun Live Mod Tools</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Our Chrome extension is currently under review by the Chrome Web Store team.</p>
                <p>Once approved, you'll be able to download it directly from the store.</p>
                <div class="modal-status">
                    <i class="fas fa-clock"></i>
                    <span>Expected approval: 1-2 weeks</span>
                </div>
                <p><strong>Want to be notified when it's ready?</strong></p>
                <input type="email" placeholder="Enter your email" class="email-input">
                <button class="btn btn-primary notify-btn">Notify Me</button>
            </div>
        </div>
        <div class="modal-overlay"></div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 1;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .modal-header h3 {
            color: #1e293b;
            margin: 0;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #64748b;
        }
        .modal-body p {
            margin-bottom: 1rem;
            color: #64748b;
        }
        .modal-status {
            background: #f0f9ff;
            padding: 1rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 1.5rem 0;
            color: #0369a1;
        }
        .email-input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            margin: 1rem 0;
            font-size: 1rem;
        }
        .notify-btn {
            width: 100%;
            justify-content: center;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(styleSheet);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(styleSheet);
    });
    
    modal.querySelector('.notify-btn').addEventListener('click', () => {
        const email = modal.querySelector('.email-input').value;
        if (email) {
            alert('Thank you! We\'ll notify you when the extension is available.');
            document.body.removeChild(modal);
            document.head.removeChild(styleSheet);
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Add some performance optimizations
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Any intensive scroll operations go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);
