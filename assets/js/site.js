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

  document.querySelectorAll("[data-tabs]").forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs
      .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
      .filter(Boolean);

    if (!tabs.length || tabs.length !== panels.length) return;

    const selectTab = (selectedTab, moveFocus = false) => {
      tabs.forEach((tab) => {
        const selected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) selectedTab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });

    const initialTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    selectTab(initialTab);
  });

  const searchEntries = [
    { title: "Home", url: "index.html", text: "An overview of Rose Aerial Systems and the MeadowHawk student VTOL aircraft." },
    { title: "Meet MeadowHawk", url: "index.html#meadowhawk", text: "How MeadowHawk got its name and what the July 21 proof flight demonstrated." },
    { title: "Competition Mission", url: "index.html#mission", text: "The planned mission covers VTOL launch, autonomous navigation, mapping, target detection, payload delivery, and landing." },
    { title: "Vehicle Overview", url: "index.html#aircraft", text: "MeadowHawk's airframe, 19 lb TDR design condition, Pixhawk, Jetson, batteries, and propulsion layout." },
    { title: "Engineering Overview", url: "engineering.html", text: "How the airframe, power system, flight control, mission computing, communications, payload, and safety work fit together." },
    { title: "Aircraft Subsystems", url: "engineering.html#subsystems", text: "A configuration-aware guide to MeadowHawk's airframe, lift system, power, flight controls, mission computer, links, and payload." },
    { title: "Airframe and Structure", url: "engineering.html#airframe", text: "The wing, fuselage, Y-tail, landing gear, and physical H-shaped lift structure." },
    { title: "Propulsion and Power", url: "engineering.html#propulsion", text: "Lift and cruise motors, batteries, ESCs, and high-current power distribution." },
    { title: "Flight Control and Navigation", url: "engineering.html#flight-control", text: "Pixhawk and ArduPilot flight modes, navigation, geofence settings, and recovery behavior." },
    { title: "Mission Computing and Perception", url: "engineering.html#mission-computing", text: "How Python, PyMAVLink, the Jetson, and the camera support mission logic and target detection." },
    { title: "Aircraft Communications", url: "engineering.html#communications", text: "Separate safety-pilot and telemetry links keep manual control independent from mission supervision." },
    { title: "Ground Control Station", url: "engineering.html#gcs", text: "The portable field case brings together Mission Planner, telemetry, video, and log review for the ground-station operator." },
    { title: "Payload System", url: "engineering.html#payload", text: "Payload retention, independent release channels, MEP testing, and pending MeadowHawk delivery work." },
    { title: "Testing History", url: "testing.html", text: "A record of simulation, bench tests, MEP flights, the yaw investigation, and MeadowHawk's proof flight." },
    { title: "MEP Payload-Drop Test", url: "testing.html#mep", text: "The Multirotor Experiment Platform payload-drop test, including autonomous takeoff and commanded release." },
    { title: "Proof of Flight", url: "testing.html#proof-flight", text: "The accepted July 21 autonomous VTOL waypoint flight covering more than one mile." },
    { title: "About Rose Aerial Systems", url: "team.html", text: "Who Rose Aerial Systems is, the work members do, and how the team approaches aircraft projects." },
    { title: "Team Members", url: "team.html#team-members", text: "A profile-card layout for approved member portraits, roles, and short biographies." },
    { title: "Join and Follow", url: "team.html#contact", text: "Team discussion on Discord and public updates on YouTube, Instagram, and LinkedIn." },
    { title: "Sponsors", url: "team.html#sponsors", text: "How companies, alumni, and other supporters can help fund aircraft materials, testing, travel, and competition costs." }
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
