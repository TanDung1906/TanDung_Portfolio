const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const profileImage = document.querySelector(".portrait-frame img");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const modal = document.querySelector("#projectModal");
const modalClose = document.querySelector(".modal-close");
const modalMeta = document.querySelector("#modalMeta");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalTasks = document.querySelector("#modalTasks");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const themeToggleBtn = document.querySelector(".theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

const projectDetails = {
  "star-learning-path": {
    meta: "Full-stack Developer / Team size: 3",
    title: "Star Learning Path",
    description:
      "A web platform that helps users follow online learning paths and track progress through interactive dashboards.",
    tasks: [
      "Built responsive UI components and learning progress dashboards with ReactJS.",
      "Developed RESTful APIs with Node.js and Express for authentication, course management, and roadmap tracking.",
      "Designed SQL Server schemas and optimized queries for user progress data.",
      "Used Git and GitHub for collaboration, merge conflict handling, and clean commit history."
    ]
  },
  "concert-ticket-selling-website": {
    meta: "Full-stack Developer / Team size: 4",
    title: "Concert Ticket Selling Website",
    description:
      "A dynamic Java web application that allows users to browse concert events, manage accounts, and book tickets.",
    tasks: [
      "Designed relational database tables for events, ticket categories, orders, and user accounts.",
      "Implemented backend business logic and database connectivity using Servlet and JDBC.",
      "Created dynamic pages with JSP, JSTL, HTML, and CSS for schedules and booking confirmations.",
      "Handled authentication sessions and Apache Tomcat configuration issues."
    ]
  },
  "smart-door-system-for-apartments": {
    meta: "IoT Developer / Team size: 3",
    title: "Smart Door System for Apartments",
    description:
      "An Arduino-based concept for reading sensor data and controlling external devices in an apartment door system.",
    tasks: [
      "Contributed to circuit design and sensor wiring.",
      "Wrote C/C++ code in Arduino IDE to read input signals.",
      "Tested device actions with sensors and basic electronic components."
    ]
  }
};

// --- Theme Toggle Logic ---
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
}

themeToggleBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
  
  // Re-render chart if it exists to update colors
  if (window.skillsChart) {
    initChart();
  }
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el) => revealObserver.observe(el));

// --- Chart.js Initialization ---
function initChart() {
  const ctx = document.getElementById('skillsRadarChart');
  if (!ctx) return;
  
  if (window.skillsChart) {
    window.skillsChart.destroy();
  }

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#e2e8f0" : "#68737d";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(49, 92, 79, 0.1)";

  window.skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Frontend', 'Backend', 'Database', 'Collaboration', 'UI/UX', 'Cloud/IoT'],
      datasets: [{
        label: 'Skill Proficiency',
        data: [90, 88, 85, 85, 78, 75],
        backgroundColor: 'rgba(47, 159, 154, 0.2)',
        borderColor: '#2f9f9a',
        pointBackgroundColor: '#c26a3a',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#c26a3a'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        r: {
          angleLines: { color: gridColor },
          grid: { color: gridColor },
          pointLabels: {
            color: textColor,
            font: { family: "'Manrope', sans-serif", size: 12, weight: 'bold' }
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initChart();
});

// --- Preloader Logic ---
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 600); // slight delay for effect
});

// --- Typewriter Effect ---
const typeWriterElement = document.querySelector(".typewriter");
const words = ["Software Engineering Student", "Full-Stack Web Developer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typeWriterElement) return;
  
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500; // Pause before typing new word
  }

  setTimeout(type, typingSpeed);
}

if (typeWriterElement) {
  setTimeout(type, 1000); // Start after preloader
}

// --- Bouncing Letters Effect ---
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.display = "flex";
  heroTitle.style.flexWrap = "wrap";
  
  const titleWords = text.split(" ");
  titleWords.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    
    for (let i = 0; i < word.length; i++) {
      const charSpan = document.createElement("span");
      charSpan.textContent = word[i];
      charSpan.classList.add("bouncing-letter");
      wordSpan.appendChild(charSpan);
    }
    
    heroTitle.appendChild(wordSpan);
    
    if (index < titleWords.length - 1) {
      const spaceSpan = document.createElement("span");
      spaceSpan.innerHTML = "&nbsp;";
      heroTitle.appendChild(spaceSpan);
    }
  });
}

// --- Existing Logic ---


navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

profileImage?.addEventListener("error", () => {
  profileImage.classList.add("broken");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.hidden = !shouldShow;
    });
  });
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-modal]");
  if (!detailButton) return;

  const details = projectDetails[detailButton.dataset.modal];
  if (!details) return;

  modalMeta.textContent = details.meta;
  modalTitle.textContent = details.title;
  modalDescription.textContent = details.description;
  modalTasks.replaceChildren(
    ...details.tasks.map((task) => {
      const item = document.createElement("li");
      item.textContent = task;
      return item;
    })
  );

  modal.showModal();
  document.body.classList.add("modal-open");
});

modalClose?.addEventListener("click", () => {
  modal.close();
});

modal?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

  formNote.textContent = "Opening your email app with a prepared message.";
  window.location.href = `mailto:ngtandung1906@gmail.com?subject=${subject}&body=${body}`;
});

// --- Avatar HTML5 Music Player ---
const avatarDisk = document.getElementById("avatarDisk");
const avatarAudio = document.getElementById("avatarAudio");

if (avatarDisk && avatarAudio) {
  // Toggle on click
  avatarDisk.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click from interfering
    if (avatarAudio.paused) {
      avatarAudio.play();
      avatarDisk.classList.add("playing");
    } else {
      avatarAudio.pause();
      avatarDisk.classList.remove("playing");
    }
  });

  // Attempt Autoplay
  const attemptPlay = () => {
    avatarAudio.play().then(() => {
      avatarDisk.classList.add("playing");
    }).catch((error) => {
      console.log("Autoplay prevented by browser. Waiting for user interaction.");
      
      // Fallback: wait for the first click anywhere on the page
      const playOnInteraction = () => {
        avatarAudio.play().then(() => {
          avatarDisk.classList.add("playing");
        }).catch(() => {});
        document.removeEventListener("click", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction);
    });
  };

  // Try playing when window loads
  window.addEventListener("load", () => {
    setTimeout(attemptPlay, 1000); // slight delay to allow preloader to finish
  });
}
