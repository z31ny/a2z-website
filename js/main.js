/* A2Z Egypt Company — shared site behavior */

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // close menu when a link is tapped
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ---------- Stat count-up ----------
const counters = document.querySelectorAll("[data-count]");
if ("IntersectionObserver" in window && counters.length) {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        cio.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => cio.observe(el));
}

// ---------- Quote form -> mailto (works with no backend) ----------
const COMPANY_EMAIL = "info@a2zegypt.com"; // <-- change to the real inbox

const form = document.getElementById("quote-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const v = (id) => (document.getElementById(id) || {}).value || "-";
    const subject = `Quote request from ${v("f-name")}${v("f-company") !== "-" ? " (" + v("f-company") + ")" : ""}`;
    const body = [
      `Name: ${v("f-name")}`,
      `Company: ${v("f-company")}`,
      `Email: ${v("f-email")}`,
      `Country: ${v("f-country")}`,
      `Interested in: ${v("f-interest")}`,
      ``,
      `Message:`,
      v("f-message"),
    ].join("\n");

    window.location.href =
      `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const success = document.getElementById("form-success");
    if (success) success.classList.add("show");
  });
}
