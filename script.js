document.addEventListener('DOMContentLoaded', function() {
  // Hero Section Animations
  const heroHeadingPart1 = document.querySelector('.hero-heading-part.part-1');
  const heroHeadingPart2 = document.querySelector('.hero-heading-part.part-2');
  const heroHeadingPart3 = document.querySelector('.hero-heading-part.part-3');
  const heroSubheadline = document.querySelector('.hero-subheadline');
  const ctaButton = document.querySelector('.hero-content .cta-button');
  
  // Sequential animation for hero heading parts
  function animateHeroHeading() {
    // First part: "Want More Clients?"
    setTimeout(() => {
      heroHeadingPart1.style.opacity = '1';
      heroHeadingPart1.style.transform = 'translateY(0)';
      
      // Trigger glitch effect
      heroHeadingPart1.classList.add('glitch-active');
      setTimeout(() => {
        heroHeadingPart1.classList.remove('glitch-active');
      }, 300);
    }, 300);
    
    // Second part: "Guaranteed"
    setTimeout(() => {
      heroHeadingPart2.style.opacity = '1';
      heroHeadingPart2.style.transform = 'translateY(0)';
      
      // Trigger glitch effect
      heroHeadingPart2.classList.add('glitch-active');
      setTimeout(() => {
        heroHeadingPart2.classList.remove('glitch-active');
      }, 300);
    }, 1000);
    
    // Third part: "—Or You Don't Pay."
    setTimeout(() => {
      heroHeadingPart3.style.opacity = '1';
      heroHeadingPart3.style.transform = 'translateY(0)';
      
      // Trigger glitch effect with different animation
      heroHeadingPart3.classList.add('glitch-active-alt');
      setTimeout(() => {
        heroHeadingPart3.classList.remove('glitch-active-alt');
      }, 400);
    }, 1700);
    
    // Subheadline: fade in slowly
    setTimeout(() => {
      heroSubheadline.style.opacity = '1';
      heroSubheadline.style.transform = 'translateY(0)';
    }, 2400);
    
    // CTA Button: fade in
    setTimeout(() => {
      ctaButton.style.opacity = '1';
      ctaButton.style.transform = 'translateY(0)';
    }, 2800);
  }
  
  // Start the hero animations
  animateHeroHeading();
  
  // Mouse-following dotted background for hero section
  const hero = document.getElementById('hero');
  const heroDots = document.querySelector('.hero-dots-highlight');
  
  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  // Function to handle mouse movement in hero section
  function handleHeroMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Set CSS variables for the mask position
    heroDots.style.setProperty('--mouse-x', `${mouseX}px`);
    heroDots.style.setProperty('--mouse-y', `${mouseY}px`);
    
    // Show the effect
    heroDots.style.opacity = '1';
  }
  
  // Add mouse move event listener to the hero section
  hero.addEventListener('mousemove', handleHeroMouseMove);
  
  // Hide the effect when mouse leaves
  hero.addEventListener('mouseleave', () => {
    heroDots.style.opacity = '0';
  });
  
  // Fade out dots at the bottom of hero section
  function updateDotsFade() {
    const heroRect = hero.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    
    // Calculate how far we've scrolled into the hero section
    const scrollPercentage = Math.min(1, scrollPosition / (heroRect.height * 0.5));
    
    // Update the opacity of the dots based on scroll position
    const dotsFade = document.querySelector('.hero-dots-fade');
    dotsFade.style.opacity = Math.min(1, scrollPercentage * 2);
  }
  
  // Update dots fade on scroll
  window.addEventListener('scroll', updateDotsFade);
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header visibility on scroll
  const header = document.getElementById('main-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
  });

  // Mouse-following Glowing Effect for Feature Cards
  const featuresContainer = document.getElementById('features-container');
  const featureCards = document.querySelectorAll('.feature-card-wrapper');
  
  // Track mouse position
  let featureMouseX = 0;
  let featureMouseY = 0;
  
  // Animation frame request ID
  let animationFrameId = null;
  
  // Function to handle mouse movement
  function handleMouseMove(e) {
    featureMouseX = e.clientX;
    featureMouseY = e.clientY;
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(updateGlowingEffects);
  }
  
  // Function to update glowing effects based on mouse position
  function updateGlowingEffects() {
    featureCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const glowingEffect = card.querySelector('.glowing-effect');
      
      // Calculate center of the card
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center
      const distanceFromCenter = Math.hypot(featureMouseX - centerX, featureMouseY - centerY);
      const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--inactiveZone'));
      
      // Check if mouse is within inactive zone
      if (distanceFromCenter < inactiveRadius) {
        card.classList.remove('active');
        return;
      }
      
      // Check if mouse is within proximity
      const proximity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--proximity'));
      const isActive = 
        featureMouseX > rect.left - proximity &&
        featureMouseX < rect.left + rect.width + proximity &&
        featureMouseY > rect.top - proximity &&
        featureMouseY < rect.top + rect.height + proximity;
      
      if (isActive) {
        card.classList.add('active');
        
        // Calculate angle from center to mouse
        const angle = Math.atan2(featureMouseY - centerY, featureMouseX - centerX) * (180 / Math.PI) + 90;
        
        // Set the start angle for the mask
        glowingEffect.style.setProperty('--start', angle.toString());
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  // Add mouse move event listener to the features container
  document.addEventListener('mousemove', handleMouseMove);
  
  // Initialize Robot Section
  initializeRobotSection();
  
  function initializeRobotSection() {
    const robotContainer = document.getElementById('robot-container');
    
    // Create a loading indicator
    const loader = document.createElement('div');
    loader.className = 'loader';
    robotContainer.appendChild(loader);
    
    // Load Spline script dynamically
    loadSplineScript()
      .then(() => {
        // Remove loader
        loader.remove();
        
        // Create Spline canvas
        const splineCanvas = document.createElement('canvas');
        splineCanvas.id = 'spline-canvas';
        splineCanvas.style.width = '100%';
        splineCanvas.style.height = '100%';
        robotContainer.appendChild(splineCanvas);
        
        // Initialize Spline
        try {
          const spline = new window.Spline.Application(splineCanvas);
          spline.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
          
          // Add mouse tracking for the robot
          const robotSection = document.getElementById('interactive-robot');
          robotSection.addEventListener('mousemove', (e) => {
            const rect = robotSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Send mouse position to Spline if available
            if (spline && spline.emitEvent) {
              spline.emitEvent('mousePosition', { x, y });
            }
          });
        } catch (error) {
          console.error('Error initializing Spline:', error);
          createRobotFallback(robotContainer);
        }
      })
      .catch(error => {
        console.error('Error loading Spline:', error);
        loader.remove();
        createRobotFallback(robotContainer);
      });
  }
  
  function loadSplineScript() {
    return new Promise((resolve, reject) => {
      if (window.Spline) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@splinetool/runtime@0.9.493/build/spline.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Spline script'));
      document.head.appendChild(script);
    });
  }
  
  function createRobotFallback(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create a fallback robot display
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.width = '100%';
    fallbackDiv.style.height = '100%';
    fallbackDiv.style.display = 'flex';
    fallbackDiv.style.alignItems = 'center';
    fallbackDiv.style.justifyContent = 'center';
    fallbackDiv.style.flexDirection = 'column';
    fallbackDiv.style.backgroundColor = '#f8f8f8';
    fallbackDiv.style.borderRadius = '8px';
    
    const robotIcon = document.createElement('div');
    robotIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#00A79D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 8V4H8"></path>
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>
    `;
    
    const fallbackText = document.createElement('p');
    fallbackText.textContent = 'AI Robot Assistant';
    fallbackText.style.marginTop = '20px';
    fallbackText.style.color = '#00A79D';
    fallbackText.style.fontWeight = 'bold';
    
    fallbackDiv.appendChild(robotIcon);
    fallbackDiv.appendChild(fallbackText);
    container.appendChild(fallbackDiv);
    
    // Add mouse tracking effect to the fallback
    const robotSection = document.getElementById('interactive-robot');
    robotSection.addEventListener('mousemove', (e) => {
      const rect = robotSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Move the robot icon slightly towards the cursor
      const moveX = (x - rect.width / 2) / 20;
      const moveY = (y - rect.height / 2) / 20;
      
      robotIcon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    hero.removeEventListener('mousemove', handleHeroMouseMove);
    window.removeEventListener('scroll', updateDotsFade);
  });
  
  // Initialize the dots fade effect
  updateDotsFade();
});

// Add CSS class for glitch animation
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS for glitch animations
  const style = document.createElement('style');
  style.textContent = `
    .glitch-active::before,
    .glitch-active::after {
      opacity: 1;
    }
    
    .glitch-active-alt::before,
    .glitch-active-alt::after {
      opacity: 1;
    }
    
    .glitch-active-alt::before {
      animation: glitch-anim-1 0.4s linear alternate-reverse;
      text-shadow: -2px 0 var(--dark-aqua);
    }
    
    .glitch-active-alt::after {
      animation: glitch-anim-2 0.4s linear alternate-reverse;
      text-shadow: 2px 0 var(--light-aqua);
    }
  `;
  document.head.appendChild(style);
});
