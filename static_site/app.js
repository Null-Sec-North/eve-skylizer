(() => {
  "use strict";

  const tabs = [...document.querySelectorAll("[data-preview-tab]")];
  const panels = [...document.querySelectorAll("[data-preview-panel]")];

  function activatePreview(name) {
    tabs.forEach((tab) => {
      const active = tab.dataset.previewTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.previewPanel === name;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activatePreview(tab.dataset.previewTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + tabs.length) % tabs.length;
      tabs[next].focus();
      activatePreview(tabs[next].dataset.previewTab);
    });
  });

  const search = document.querySelector("#record-search");
  const filter = document.querySelector("#record-filter");
  const rows = [...document.querySelectorAll("#record-body tr")];
  const count = document.querySelector("#record-count");

  function filterRecords() {
    const query = search.value.trim().toLowerCase();
    const category = filter.value;
    let visible = 0;
    rows.forEach((row) => {
      const matchesQuery = !query || row.textContent.toLowerCase().includes(query);
      const matchesCategory = category === "all" || row.dataset.category === category;
      const show = matchesQuery && matchesCategory;
      row.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${rows.length} sample records.`;
  }

  search.addEventListener("input", filterRecords);
  filter.addEventListener("change", filterRecords);

  const copyButton = document.querySelector("#copy-clone");
  const cloneCommand = document.querySelector("#clone-command");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand.textContent.trim());
      copyButton.textContent = "Copied";
      setTimeout(() => { copyButton.textContent = "Copy command"; }, 1800);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(cloneCommand);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = "Select and copy";
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach((section) => navObserver.observe(section));
  }
})();
