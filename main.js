/**
 * STACKLY - Shared JavaScript Logic & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  if (header) {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Update menu icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
      }
    });
    
    // Close mobile menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // 4. Scroll Reveal Animations (using Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom-in, .fade-in');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 5. Collapsible FAQ Accordion (For Contact Page)
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items first
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.height = '0px';
      });
      
      if (!isActive) {
        item.classList.add('active');
        content.style.height = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.height = '0px';
      }
    });
  });

  // 6. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple validation
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const msgTextarea = contactForm.querySelector('textarea');
      
      if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || msgTextarea.value.trim() === '') {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Simple animated success state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="spin-icon" data-lucide="loader-2"></i> Sending...';
      lucide.createIcons();
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i data-lucide="check"></i> Sent successfully!';
        lucide.createIcons();
        submitBtn.style.backgroundColor = '#10B981'; // Green color for success
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          lucide.createIcons();
          alert('Thank you for contacting STACKLY! We will get back to you shortly.');
        }, 2000);
      }, 1500);
    });
  }

  // 7. Interactive Controls (For Dashboard Page)
  const controlItems = document.querySelectorAll('.control-item');
  controlItems.forEach(item => {
    const toggle = item.querySelector('input[type="checkbox"]');
    if (toggle) {
      // Set initial status based on checkbox checked status
      if (toggle.checked) {
        item.classList.add('active');
      }
      
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          item.classList.add('active');
          showToast(`${item.querySelector('.control-label').innerText} turned ON`);
        } else {
          item.classList.remove('active');
          showToast(`${item.querySelector('.control-label').innerText} turned OFF`);
        }
      });
    }
  });

  // 8. Custom Toast Notification for Dashboard
  function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.position = 'fixed';
      container.style.bottom = '2rem';
      container.style.right = '2rem';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '0.5rem';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.background = '#111827';
    toast.style.color = '#fff';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '500';
    toast.style.transform = 'translateY(50px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    toast.innerText = message;

    container.appendChild(toast);

    // Trigger transition
    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateY(-20px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // 9. Mobile Dashboard Sidebar Toggle Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (mobileMenuToggle && sidebar) {
    // Open sidebar
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
    });

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    };

    // Close on click of close button
    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSidebar);
    }

    // Close on click of backdrop overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close menu when a link inside is clicked
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-menu-item a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }
});
