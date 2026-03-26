// Menu toggle
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

//close menu when link is clicked
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// Typed.js initialization
const typed = new Typed(".text", {
  strings: ["a Data Analyst", "a Data Visualization Expert", "a Python Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Header scroll effect
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Active link on scroll
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", (e) => {
    document.querySelectorAll(".navbar a").forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Smooth scroll to top
document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide scroll top button
window.addEventListener("scroll", () => {
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Create particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;

  const particleCount = window.innerWidth > 768 ? 50 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 18 + "s";
    particle.style.setProperty("--i", Math.floor(Math.random() * 3));
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Canvas animation - Data Visualization Network
function initCanvasAnimation() {
  const canvas = document.getElementById("cinema-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 100), 15);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 - distance / 375})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

initCanvasAnimation();

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-value");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, 40);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

animateCounters();

// Form handling
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector(".submit-btn");
    const overlay = form.querySelector(".form-overlay");

    try {
      submitBtn.disabled = true;
      overlay.classList.add("active");

      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showMessage("Message sent successfully!", "success");
        form.reset();
        setTimeout(() => {
          overlay.classList.remove("active");
          submitBtn.disabled = false;
        }, 1500);
      } else {
        showMessage("Error sending message. Please try again.", "error");
        overlay.classList.remove("active");
        submitBtn.disabled = false;
      }
    } catch (error) {
      showMessage("An error occurred. Please try again.", "error");
      overlay.classList.remove("active");
      submitBtn.disabled = false;
    }
  });
}

// Form validation
const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      input.classList.add("touched");
    }
  });

  input.addEventListener("input", () => {
    if (input.type === "text" && input.id === "name") {
      input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
    }
  });
});

// Character counter for textarea
const textarea = document.querySelector('textarea[name="message"]');
if (textarea) {
  const maxLength = 500;

  textarea.addEventListener("input", () => {
    const counter = document.querySelector(".char-counter");
    const remaining = maxLength - textarea.value.length;

    if (counter) {
      counter.textContent = `${textarea.value.length}/${maxLength}`;

      if (remaining < 50) {
        counter.classList.add("warning");
      } else if (remaining <= 0) {
        counter.classList.add("limit");
      } else {
        counter.classList.remove("warning", "limit");
      }

      if (textarea.value.length > maxLength) {
        textarea.value = textarea.value.substr(0, maxLength);
      }
    }
  });
}

// Show message toast
function showMessage(message, type) {
  const messageDiv = document.querySelector(".form-message");

  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.classList.remove("success", "error");
    messageDiv.classList.add(type);
    messageDiv.classList.add("show");

    setTimeout(() => {
      messageDiv.classList.remove("show");
    }, 5000);
  }
}

// Mouse follower
const mouseFollower = document.querySelector(".mouse-follower");

if (mouseFollower) {
  document.addEventListener("mousemove", (e) => {
    mouseFollower.style.left = e.clientX + "px";
    mouseFollower.style.top = e.clientY + "px";
  });

  document.addEventListener("mouseenter", () => {
    mouseFollower.style.opacity = "0.6";
  });

  document.addEventListener("mouseleave", () => {
    mouseFollower.style.opacity = "0";
  });

  // Highlight hover elements
  document.addEventListener("mouseover", (e) => {
    if (
      e.target.tagName === "A" ||
      e.target.tagName === "BUTTON" ||
      e.target.classList.contains("skill") ||
      e.target.classList.contains("project-card")
    ) {
      mouseFollower.classList.add("hover");
    } else {
      mouseFollower.classList.remove("hover");
    }
  });
}

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll(".orb");

  parallaxElements.forEach((element) => {
    const scrollPosition = window.scrollY;
    element.style.transform = `translate(0, ${scrollPosition * 0.05}px)`;
  });
});

// Refresh particles on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const particlesContainer = document.querySelector(".particles");
    if (particlesContainer) {
      particlesContainer.innerHTML = "";
      createParticles();
    }
  }, 250);
});

// Add animation delay to navbar links
document.querySelectorAll(".navbar a").forEach((link, index) => {
  link.style.setProperty("--i", index);
});

// Add animation delay to social icons
document.querySelectorAll(".home-sci a").forEach((link, index) => {
  link.style.setProperty("--i", index);
});

// Lazy load images
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      observer.unobserve(entry.target);
    }
  });
});

images.forEach((img) => {
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease";
  imageObserver.observe(img);
});

// Portfolio animations on page load
window.addEventListener("load", () => {
  const animations = document.querySelectorAll("[animation]");
  animations.forEach((el) => {
    el.classList.add("animated");
  });
});
