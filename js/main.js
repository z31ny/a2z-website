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
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  // close menu when a link is tapped
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  // close menu when tapping outside it
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu();
    }
  });
  // close menu with the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
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

// ---------- Quote form -> Web3Forms (auto-delivers to the inbox) ----------
// The access key is a public, domain-restricted client key — safe to ship.
const WEB3FORMS_KEY = "baed2feb-da81-4d1b-8e7e-94dd44ef667f";
const COMPANY_EMAIL = "amrelzeiny@a2zegyptcompany.com"; // quote requests are delivered here

const form = document.getElementById("quote-form");
if (form) {
  const statusEl = document.getElementById("form-success");
  const submitBtn = form.querySelector('button[type="submit"]');
  const t = (key, fallback) => {
    try {
      const dict = typeof I18N !== "undefined" && I18N[document.documentElement.lang];
      return (dict && dict[key]) || fallback;
    } catch (_) {
      return fallback;
    }
  };

  const setStatus = (key, fallback, ok) => {
    if (!statusEl) return;
    statusEl.textContent = t(key, fallback);
    statusEl.classList.toggle("is-error", !ok);
    statusEl.classList.add("show");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const v = (id) => (document.getElementById(id) || {}).value || "";
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New quote request — ${v("f-name") || "A2Z website"}`,
      from_name: "A2Z Egypt Company website",
      name: v("f-name"),
      email: v("f-email"),
      replyto: v("f-email"),
      company: v("f-company"),
      country: v("f-country"),
      interested_in: v("f-interest"),
      message: v("f-message"),
      botcheck: form.querySelector('[name="botcheck"]') ? form.querySelector('[name="botcheck"]').checked : false,
    };

    const btnDefault = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t("form_sending", "Sending…");
    }
    if (statusEl) statusEl.classList.remove("show");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setStatus("form_success", "Thanks! Your request has been sent — we'll reply within one business day.", true);
      } else {
        setStatus("form_error", "Something went wrong. Please email us directly at amrelzeiny@a2zegyptcompany.com.", false);
      }
    } catch (err) {
      setStatus("form_error", "Something went wrong. Please email us directly at amrelzeiny@a2zegyptcompany.com.", false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnDefault;
      }
    }
  });
}
