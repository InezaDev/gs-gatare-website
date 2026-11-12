// Mobile navigation, inquiry forms and current footer year.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Front-end email handoff: no form data is stored or sent to a server.
function prepareEmail(form, recipient, subject, fields, statusElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = fields.map(([label, selector]) => {
      const element = form.querySelector(selector);
      return `${label}: ${element.value.trim()}`;
    });
    const body = encodeURIComponent(values.join("\n\n"));
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
    statusElement.textContent = "Opening your email application…";
    window.location.href = mailto;
  });
}

prepareEmail(
  document.getElementById("inquiryForm"),
  "gsgatare@gmail.com",
  "Admission inquiry — G.S. Gatare",
  [
    ["Full name", "#fullName"],
    ["Phone", "#phone"],
    ["Email", "#email"],
    ["Program of interest", "#program"],
    ["Message", "#message"]
  ],
  document.getElementById("formStatus")
);

prepareEmail(
  document.getElementById("contactForm"),
  "gsgatare@gmail.com",
  "Website message — G.S. Gatare",
  [
    ["Name", "#contactName"],
    ["Email", "#contactEmail"],
    ["Message", "#contactMessage"]
  ],
  document.createElement("p")
);
