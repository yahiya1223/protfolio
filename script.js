// ============================================================
// CONFIG — edit these values to update the site quickly
// ============================================================
const CURRENT_SEMESTER = 5;
const TOTAL_SEMESTERS = 8;
const CGPA = "3.64";

// ============================================================
// Build the semester ledger track
// ============================================================
function buildLedger() {
  const track = document.getElementById("ledgerTrack");
  if (!track) return;

  let html = "";

  for (let i = 1; i <= TOTAL_SEMESTERS; i++) {
    let stateClass = "";
    let stateLabel = "";

    if (i < CURRENT_SEMESTER) {
      stateClass = "is-complete";
      stateLabel = "Complete";
    } else if (i === CURRENT_SEMESTER) {
      stateClass = "is-current";
      stateLabel = "Current";
    } else {
      stateClass = "is-upcoming";
      stateLabel = "Upcoming";
    }

    html += `
      <div class="ledger-cell ${stateClass}" style="animation-delay:${i * 0.06}s">
        <span class="cell-num mono">SEM ${String(i).padStart(2, "0")}</span>
        <span class="cell-state">${stateLabel}</span>
      </div>`;
  }

  track.innerHTML = html;
}

// ============================================================
// Mobile nav toggle
// ============================================================
function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    if (isOpen) {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "64px";
      nav.style.right = "20px";
      nav.style.background = "#FBFAF6";
      nav.style.border = "1px solid #C9C2B4";
      nav.style.padding = "16px 24px";
      nav.style.gap = "14px";
    } else {
      nav.style.display = "none";
    }
  });

  // Close menu after clicking a link on mobile
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 780) {
        nav.classList.remove("is-open");
        nav.style.display = "none";
      }
    });
  });
}

// ============================================================
// Scroll reveal for sections
// ============================================================
function setupScrollReveal() {
  const targets = document.querySelectorAll(
    ".about-grid, .timeline-item, .skill-card, .project-row, .contact-link"
  );

  if (!("IntersectionObserver" in window) || targets.length === 0) return;

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  targets.forEach((el) => observer.observe(el));
}

// ============================================================
// Footer year
// ============================================================
function setYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

// ============================================================
// Initialize
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  buildLedger();
  setupNavToggle();
  setupScrollReveal();
  setYear();
});
