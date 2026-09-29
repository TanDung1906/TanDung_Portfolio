// Force page to always load at the top
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

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

// --- Preloader / Enter Screen Logic ---
const enterScreen = document.getElementById("enterScreen");
const enterText = document.querySelector(".enter-text");

  const greetings = ["Xin Chào", "Bonjour", "Hola", "こんにちは", "WELCOME", "Hello"];
  const greetingText = document.getElementById("greetingText");
  const enterHint = document.getElementById("enterHint");

  if (greetingText) {
    let step = 0;
    
    // Smooth fade transition for the text
    greetingText.style.transition = "opacity 0.4s ease-in-out";
    
    // Show the "Tap to enter" hint shortly after the page loads
    setTimeout(() => {
      if (enterHint) {
        enterHint.style.opacity = 1;
        enterHint.style.animation = "blink 1.5s infinite";
      }
    }, 1500);

    // Continuously loop through greetings
    setInterval(() => {
      greetingText.style.opacity = 0; // Fade out
      
      setTimeout(() => {
        step = (step + 1) % greetings.length;
        greetingText.textContent = greetings[step];
        greetingText.style.opacity = 1; // Fade back in
      }, 400); // Change text when invisible
      
    }, 2000); // Change greeting every 2 seconds
  }

if (enterScreen) {
  enterScreen.addEventListener("click", () => {
    document.body.classList.add("loaded");
    
    // Attempt to start the music right away
    const avatarAudio = document.getElementById("avatarAudio");
    const avatarDisk = document.getElementById("avatarDisk");
    if (avatarAudio) {
      avatarAudio.play().then(() => {
        if (avatarDisk) avatarDisk.classList.add("playing");
      }).catch(err => console.log("Audio play failed:", err));
    }
  });
}

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

// --- HTML5 Music Player & Playlist ---
const avatarAudioBottom = document.getElementById("avatarAudio");
const avatarDiskBottom = document.getElementById("avatarDisk");
const musicToggleBtn = document.querySelector(".floating-music-btn");
const musicPrevBtn = document.querySelector(".music-prev-btn");
const musicNextBtn = document.querySelector(".music-next-btn");
const musicTrackName = document.getElementById("musicTrackName");
const musicOnIcon = document.querySelector(".music-on-icon");
const musicOffIcon = document.querySelector(".music-off-icon");
const playlistDropdown = document.getElementById("playlistDropdown");
const playlistList = document.getElementById("playlistList");

// Sếp có thể tự thêm nhạc vào đây bằng cách copy dòng bên dưới
let playlist = [
  { name: "Anh Chỉ Yêu Cô Ta", src: "assets/bgm.mp3" },
  { name: "Laviem", src: "assets/bai2.mp3" },
  { name: "Lưu niên", src: "assets/bai3.mp3" }
];

// Random bài hát khởi đầu
let currentTrackIndex = Math.floor(Math.random() * playlist.length);

// Generate Playlist HTML
if (playlistList) {
  playlistList.innerHTML = playlist.map((track, index) => 
    `<li data-index="${index}">${track.name}</li>`
  ).join("");
  
  playlistList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const idx = parseInt(e.target.getAttribute("data-index"));
      currentTrackIndex = idx;
      loadTrack(idx);
      avatarAudioBottom.play().then(() => syncMusicUI(true)).catch(err => console.log(err));
      playlistDropdown.classList.remove("show");
    }
  });
}

if (musicTrackName) {
  musicTrackName.addEventListener("click", (e) => {
    e.stopPropagation();
    playlistDropdown.classList.toggle("show");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (playlistDropdown && playlistDropdown.classList.contains("show") && !e.target.closest('.floating-music-player')) {
    playlistDropdown.classList.remove("show");
  }
});

function syncMusicUI(isPlaying) {
  if (isPlaying) {
    if (avatarDiskBottom) avatarDiskBottom.classList.add("playing");
    if (musicToggleBtn) musicToggleBtn.classList.add("playing");
    if (musicOnIcon) musicOnIcon.style.display = "block";
    if (musicOffIcon) musicOffIcon.style.display = "none";
  } else {
    if (avatarDiskBottom) avatarDiskBottom.classList.remove("playing");
    if (musicToggleBtn) musicToggleBtn.classList.remove("playing");
    if (musicOnIcon) musicOnIcon.style.display = "none";
    if (musicOffIcon) musicOffIcon.style.display = "block";
  }
}

function loadTrack(index) {
  if (!avatarAudioBottom || playlist.length === 0) return;
  const track = playlist[index];
  avatarAudioBottom.src = track.src;
  if (musicTrackName) musicTrackName.textContent = track.name;
  
  // Highlight active song in list
  if (playlistList) {
    Array.from(playlistList.children).forEach((li, i) => {
      li.classList.toggle("active", i === index);
    });
  }
}

function toggleMusic(e) {
  if (e) e.stopPropagation(); 
  if (!avatarAudioBottom) return;
  if (avatarAudioBottom.paused) {
    avatarAudioBottom.play().catch(e => console.log("Autoplay blocked", e));
    syncMusicUI(true);
  } else {
    avatarAudioBottom.pause();
    syncMusicUI(false);
  }
}

function playNext(e) {
  if (e) e.stopPropagation();
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  avatarAudioBottom.play().then(() => syncMusicUI(true)).catch(e => console.log("Play error", e));
}

function playPrev(e) {
  if (e) e.stopPropagation();
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  avatarAudioBottom.play().then(() => syncMusicUI(true)).catch(e => console.log("Play error", e));
}

if (avatarDiskBottom) avatarDiskBottom.addEventListener("click", toggleMusic);
if (musicToggleBtn) musicToggleBtn.addEventListener("click", toggleMusic);
if (musicNextBtn) musicNextBtn.addEventListener("click", playNext);
if (musicPrevBtn) musicPrevBtn.addEventListener("click", playPrev);

if (avatarAudioBottom) {
  avatarAudioBottom.addEventListener('play', () => syncMusicUI(true));
  avatarAudioBottom.addEventListener('pause', () => syncMusicUI(false));
  avatarAudioBottom.addEventListener('ended', playNext);
}
// Init playlist display if multiple tracks or explicitly requested
loadTrack(currentTrackIndex);

// --- Custom Neon Cursor ---
const cursorDot = document.querySelector('.neon-cursor');
const cursorTrail = document.querySelector('.neon-cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  }
});

function animateCursor() {
  let distX = mouseX - trailX;
  let distY = mouseY - trailY;
  trailX += distX * 0.2;
  trailY += distY * 0.2;
  
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for links and buttons
const interactiveElements = document.querySelectorAll('a, button, .project-card, .portrait-orbit');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// --- 3D Tilt Effect on Project Cards ---
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `perspective(1000px) rotateX(deg) rotateY(deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });
});

// --- Particle Matrix Background ---
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(251, 146, 60, 0.5)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        this.x -= dx * 0.05;
        this.y -= dy * 0.05;
      }

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, )`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

