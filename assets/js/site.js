(() => {
  "use strict";

  const config = window.RAS_CONFIG || {};

  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (Object.prototype.hasOwnProperty.call(config, key) && config[key]) {
      element.textContent = config[key];
    }
  });

  document.querySelectorAll("[data-config-href]").forEach((element) => {
    const key = element.dataset.configHref;
    const value = config[key];
    if (value) {
      element.setAttribute("href", value);
      element.hidden = false;
    } else if (element.hasAttribute("data-optional-link")) {
      element.hidden = true;
    }
  });

  const emailLinks = document.querySelectorAll("[data-email-link]");
  emailLinks.forEach((link) => {
    const email = config.teamEmail || "";
    const label = link.dataset.emailLabel || "";
    const subjectKey = link.dataset.emailSubject;
    const subject = subjectKey ? config[subjectKey] : "";
    if (email && !email.startsWith("REPLACE-")) {
      const subjectQuery = subject ? "?subject=" + encodeURIComponent(subject) : "";
      link.href = "mailto:" + email + subjectQuery;
      link.textContent = label || email;
    } else {
      link.removeAttribute("href");
      link.textContent = label || "Email unavailable";
      link.classList.add("needs-edit");
    }
  });

  const currentPage = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-main-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  const searchEntries = [
    { title: "Home", url: "index.html", text: "Rose Aerial Systems MeadowHawk student research competition unmanned aircraft autonomous VTOL QuadPlane" },
    { title: "Competition Mission", url: "index.html#mission", text: "VTOL launch autonomous navigation mapping search detection payload delivery return landing" },
    { title: "Vehicle Overview", url: "index.html#aircraft", text: "QuadPlane pusher H-shaped lift structure X-frame control allocation 19 lb design condition Pixhawk Jetson three 6S batteries" },
    { title: "Engineering Overview", url: "engineering.html", text: "airframe propulsion power flight control mission computing communications payload safety" },
    { title: "Airframe and Structure", url: "engineering.html#airframe", text: "fixed wing MH32 H-shaped lift structure X-frame control allocation Y-tail booms landing gear" },
    { title: "Propulsion and Power", url: "engineering.html#propulsion", text: "lift motors cruise motor batteries PDB ESC power distribution" },
    { title: "Flight Control and Navigation", url: "engineering.html#flight-control", text: "Pixhawk 6X ArduPilot aircraft control modes navigation geofence" },
    { title: "Mission Computing and Perception", url: "engineering.html#mission-computing", text: "Jetson Orin NX Python PyMAVLink camera pipeline OpenCV target detection" },
    { title: "Communications and Ground Station", url: "engineering.html#communications", text: "safety pilot ELRS telemetry Mission Planner ground control station" },
    { title: "Payload System", url: "engineering.html#payload", text: "bottle beacon payload delivery mechanical release test" },
    { title: "Testing History", url: "testing.html", text: "MEP SITL flight test yaw incident X-frame proof flight one mile" },
    { title: "MEP Payload-Drop Test", url: "testing.html#mep", text: "Multirotor Experiment Platform autonomous takeoff commanded payload release video" },
    { title: "Proof of Flight", url: "testing.html#proof-flight", text: "July 21 one-mile autonomous VTOL waypoint proof flight approved video" },
    { title: "About Rose Aerial Systems", url: "team.html", text: "student organization competition team aircraft projects members subteams Rose-Hulman" },
    { title: "Join and Follow", url: "team.html#contact", text: "Discord YouTube Instagram LinkedIn email membership contact" },
    { title: "Sponsors", url: "team.html#sponsors", text: "partners sponsors support Rose-Hulman" }
  ];

  const dialog = document.querySelector("[data-search-dialog]");
  const openButtons = document.querySelectorAll("[data-open-search]");
  const closeButton = document.querySelector("[data-close-search]");
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");

  function renderResults(query = "") {
    if (!results) return;
    const normalized = query.trim().toLowerCase();
    const matches = searchEntries.filter((entry) =>
      !normalized || `${entry.title} ${entry.text}`.toLowerCase().includes(normalized)
    );

    results.innerHTML = matches.length
      ? matches.map((entry) => `
          <li>
            <a href="${entry.url}">
              <strong>${entry.title}</strong>
              <span>${entry.text}</span>
            </a>
          </li>`).join("")
      : "<li class=\"search-empty\">No matching section was found.</li>";
  }

  openButtons.forEach((button) => button.addEventListener("click", () => {
    if (!dialog) return;
    renderResults("");
    dialog.showModal();
    setTimeout(() => input?.focus(), 0);
  }));

  closeButton?.addEventListener("click", () => dialog?.close());
  input?.addEventListener("input", (event) => renderResults(event.target.value));

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      document.querySelector("[data-open-search]")?.click();
    }
  });
})();
