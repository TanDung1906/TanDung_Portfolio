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
