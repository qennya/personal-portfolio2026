// ====== Customize here ======
const DATA = {
  projects: [
        {
      id: "MobilityScooter Research",
      title: "Mobility Scooter NHS Research",
      tag: "Frontend",
      stack: ["Kotlin","Mobile UX/UI"],
       desc: "Mobility Scooter Mobile Application was built to improve the safety of mobility scooter users by analyzing their driving behaviors and providing real-time feedback.",
      longDesc: ["While a mobility scooter project was being developed for the NHS, I conducted paid user research with local hospitals to inform design decisions. I created multiple surverys and conducted patient interviews to gather insights on user needs, pain points, and preferences regarding mobility scooter usage and safety. I was also responsible for analyzing the collected data and presenting findings to the design and development teams to inform the app's features and user experience.",
      "This research was presented at the Cal Poly Pomona Undergraduate Research Symposium in 2025 and is currently under privacy restriction!",],
        images: [
        "images/projects/research/poster.jpg",
        "images/projects/research/screen.png",
        "images/projects/research/usermanual.png",
      ],
      links: {
        Manual: "files/Mobility_Scooter_UserManual.pdf",
      }

    },
    
    {
      id: "petminder",
      title: "PetMinder",
      tag: "FullStack",
      stack: ["Dart (Flutter)", "Firebase", "Figma"],
      desc: "Andriod Mobile App that helps pet owners manage their pets' care routines.",
     longDesc: [
      "PetMinder helps owners track feeding, walks, grooming, meds, and recurring reminders. I focused on a clean UX, scalable data model, and notification-friendly flows.",
      "Main features include task scheduling, pet profiles, and task tracking.",
      "Timeline: 2 weeks for design + prototyping, 4 weeks for development and testing.",],
      images: [
        "images/projects/createnewpet.gif",
        "images/projects/createnewtask.gif",
        "images/projects/deletefeatures.gif"
      ],
      links: {
        github: "https://github.com/Solares10/PetMinder2.0",
        Figma: "https://www.figma.com/design/BkpyT9cSooidNGhTL6wtS9/PetMinder---Mobile-App-Project?node-id=0-1&p=f&t=NBCxSh4SSULl6CKr-0"
      }
    },
    {
      id: "dattingsim",
      title: "Love Love Green Camp",
      tag: "Full Stack",
      stack: ["Android Studio","C++", "Dart", "Flutter"],
      desc: "Simple dating game created to learn game development and create art beyond a lecture hall!",
      longDesc: ["This game is currently in-progress and has a placeholder name of Love Love Green Camp. This project takes heavy inpiration from early 2000's dating sims like Tokimeki Memorial Girl with its coming of age storyline/setting and playthrough structure.",
        "This is a solo development project, timeline to complete this project is TBD.",],
      images: [
        "images/projects/datingsim/bell.png",
        "images/projects/datingsim/startscreen.png"
      ],
      links: { github: "https://github.com/qennya/lovelovegreencamp" }
    },
  ],

  // Add your own design images here (optional)
  design: [
    { title: "sheCodes Brand", meta: "Pink and inclusivity from Aug 2024 to May 2025.", image: "images/design/logo.png", link: "https://www.cppshecodes.com/" },
    { title: "sheCodes Merch", meta: "Made club Merch from Aug 2024 to May 2025", image: "images/design/merch.png", link: "https://www.instagram.com/cppshecodes/" },
    { title: "sheCodes Graphics", meta: "Social Media graphic designer from Aug 2024 to May 2025 ", link: "https://www.instagram.com/cppshecodes/", image: "images/design/graphics.png" },
  ],

  skills: {
    cs: ["JavaScript", "TypeScript", "Python", "Java", "Data Structures", "Algorithms", "APIs", "Databases", "HCI", "Accessibility"],
    design: ["Layout", "Branding", "Typography", "Color Systems", "Motion", "UX Writing", "Prototyping"],
    tools: ["Figma", "Adobe CC", "Git/GitHub", "VS Code", "Notion", "Jira"]
  }
};

// ====== Utilities ======
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function bringToFront(win){
  const wins = $$("[data-window]");
  const maxZ = wins.reduce((m,w)=>Math.max(m, Number(w.style.zIndex||4)), 4);
  win.style.zIndex = String(maxZ + 1);
}

function openWindow(id){
  const win = document.getElementById(id);
  if(!win) return;
  win.classList.add("is-open");
  win.classList.remove("is-minimized");
  bringToFront(win);

  if(!win.dataset.opened){
    const offset = Math.floor(Math.random()*26) + 10;
    const left = clamp(18 + offset, 10, window.innerWidth - 340);
    const top  = clamp(110 + offset, 70, window.innerHeight - 220);
    win.style.left = left + "px";
    win.style.top  = top + "px";
    win.dataset.opened = "true";
  }
}

function closeWindow(win){ win.classList.remove("is-open"); }
function minimizeWindow(win){ win.classList.toggle("is-minimized"); }
function toggleMaximize(win){
  win.classList.toggle("is-maximized");
  bringToFront(win);
}

// ====== Drag ======
function enableDragging(){
  $$("[data-window]").forEach(win => {
    const dragHandle = win.querySelector("[data-drag]");
    if(!dragHandle) return;

    let dragging = false;
    let startX = 0, startY = 0;
    let startLeft = 0, startTop = 0;

    const onDown = (e) => {
      const target = e.target;
      if(target && target.closest(".titlebar__btn")) return;

      dragging = true;
      bringToFront(win);
      dragHandle.setPointerCapture?.(e.pointerId);

      const rect = win.getBoundingClientRect();
      startLeft = rect.left;
      startTop  = rect.top;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMove = (e) => {
      if(!dragging) return;
      if(win.classList.contains("is-maximized")) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newLeft = clamp(startLeft + dx, 8, window.innerWidth - 220);
      const newTop  = clamp(startTop + dy, 60, window.innerHeight - 120);

      win.style.left = newLeft + "px";
      win.style.top  = newTop + "px";
    };

    const onUp = () => { dragging = false; };

    dragHandle.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  });
}

// ====== Window controls ======
function bindWindowControls(){
  $$("[data-window]").forEach(win => {
    win.addEventListener("pointerdown", () => bringToFront(win));

    win.querySelector("[data-close]")?.addEventListener("click", () => closeWindow(win));
    win.querySelector("[data-minimize]")?.addEventListener("click", () => minimizeWindow(win));
    win.querySelector("[data-maximize]")?.addEventListener("click", () => toggleMaximize(win));
  });

  // IMPORTANT: open windows from ANY element with data-open (icons + hero buttons)
  $$("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => openWindow(btn.dataset.open));
  });
}

// ====== Render ======
function renderSkills(){
  const makePills = (items, rootId) => {
    const root = document.getElementById(rootId);
    if(!root) return;
    root.innerHTML = items.map(s => `<span class="pill">${escapeHtml(s)}</span>`).join("");
  };
  makePills(DATA.skills.cs, "skillsCS");
  makePills(DATA.skills.design, "skillsDesign");
  makePills(DATA.skills.tools, "skillsTools");
}

function renderProjects(list){
  const grid = $("#projectGrid");
  if(!grid) return;

  grid.innerHTML = list.map(p => {
    const tags = [
      `<span class="tag">${escapeHtml((p.tag || "tag").toUpperCase())}</span>`,
      ...(p.stack || []).slice(0,3).map(s => `<span class="tag">${escapeHtml(s)}</span>`)
    ].join(" ");

    const links = Object.entries(p.links || {}).map(([k,v]) => {
      const label = k === "github" ? "GitHub" : (k === "demo" ? "Live Demo" : k);
      return `<a class="btn" href="${escapeAttr(v)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    }).join("");

    return `
      <article class="project" role="button" tabindex="0" data-project-id="${escapeAttr(p.id || p.title)}">
        <div class="project__top">
          <h3 class="project__title">${escapeHtml(p.title)}</h3>
          <div>${tags}</div>
        </div>
        <p class="project__desc">${escapeHtml(p.desc)}</p>

        <div class="project__links">
          <button class="btn primary" type="button" data-view-project="${escapeAttr(p.id || p.title)}">View details</button>
          ${links}
        </div>
      </article>
    `;
  }).join("");

  // click handlers (card click OR button click)
  $$("[data-view-project]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProjectDetail(btn.dataset.viewProject);
    });
  });

  $$("[data-project-id]").forEach(card => {
    const id = card.dataset.projectId;
    card.addEventListener("click", () => openProjectDetail(id));
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openProjectDetail(id);
      }
    });
  });
}


function renderDesign(){
  const grid = $("#designGrid");
  if(!grid) return;

  grid.innerHTML = DATA.design.map(d => `
    <article class="tile">
      <div class="tile__thumb" aria-hidden="true">
        ${d.image ? `<img src="${escapeAttr(d.image)}" alt="">` : ``}
      </div>
      <div class="tile__body">
        <h3 class="tile__title">${escapeHtml(d.title)}</h3>
        <p class="tile__meta">${escapeHtml(d.meta)}</p>
        <div style="margin-top:10px;">
          <a class="btn" href="${escapeAttr(d.link)}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </div>
    </article>
  `).join("");
}

function findProjectById(id){
  // supports using id OR title as fallback
  return DATA.projects.find(p => (p.id && p.id === id) || p.title === id);
}

function openProjectDetail(id){
  const p = findProjectById(id);
  if(!p){
    openWindow("win-project-detail");
    $("#projectDetailContent").innerHTML = `<p class="muted">Project not found.</p>`;
    $("#projectDetailTitlebar").textContent = `PROJECT–not_found.txt`;
    return;
  }

  $("#projectDetailTitlebar").textContent = `PROJECT–${p.title}.txt`;

  const images = (p.images || []).filter(Boolean);
  const gallery = images.length
    ? `
      <div class="projGallery" aria-label="Project image gallery">
        ${images.map(src => `
          <button class="projGallery__item" type="button">
            <img src="${escapeAttr(src)}" alt="${escapeAttr(p.title)} screenshot" loading="lazy">
          </button>
        `).join("")}
      </div>
      <p class="tiny muted">Tip: click an image to view larger.</p>
    `
    : `<p class="muted tiny">No images added yet. Add <code>images: []</code> in DATA.projects.</p>`;

  const links = Object.entries(p.links || {}).map(([k,v]) => {
    const label = k === "github" ? "GitHub" : (k === "demo" ? "Live Demo" : k);
    return `<a class="btn" href="${escapeAttr(v)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  }).join("");

  const stack = (p.stack || []).map(s => `<span class="pill">${escapeHtml(s)}</span>`).join("");

  $("#projectDetailContent").innerHTML = `
    <div class="projDetail">
      <div class="projDetail__head">
        <div>
          <h2 class="h2" style="margin:0;">${escapeHtml(p.title)}</h2>
          <p class="muted" style="margin-top:6px;">${escapeHtml(p.desc || "")}</p>
          <div class="muted">
  ${p.longDesc.map(t => `<p>${escapeHtml(t)}</p>`).join("")}
</div>

        </div>

        <div class="projDetail__meta card">
          <div class="tiny muted">Category</div>
          <div style="margin-top:4px;"><span class="tag">${escapeHtml((p.tag || "project").toUpperCase())}</span></div>

          <div class="tiny muted" style="margin-top:10px;">Tech</div>
          <div class="pills" style="margin-top:6px;">${stack || `<span class="muted tiny">—</span>`}</div>

          <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
            ${links || ""}
          </div>
        </div>
      </div>

      ${gallery}

      <div class="card" style="margin-top:12px;">
      </div>
    </div>
  `;

  // lightbox-ish: click image opens in new tab OR simple “zoom” modal
  // Here: quick zoom by opening the image in a new tab
  $$(".projGallery__item img", $("#projectDetailContent")).forEach(img => {
    img.parentElement.addEventListener("click", () => window.open(img.src, "_blank"));
  });

  openWindow("win-project-detail");
}



function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(str){ return escapeHtml(str); }

// ====== Filters ======
function bindProjectFilters(){
  const search = $("#projectSearch");
  const filter = $("#projectFilter");

  const apply = () => {
    const q = (search?.value || "").trim().toLowerCase();
    const f = (filter?.value || "all").toLowerCase();

    const out = DATA.projects.filter(p => {
      const hay = [p.title, p.desc, p.tag, ...(p.stack||[])].join(" ").toLowerCase();
      const matchesQ = q === "" || hay.includes(q);
      const matchesF = f === "all" || (p.tag || "").toLowerCase() === f;
      return matchesQ && matchesF;
    });

    renderProjects(out);
  };

  search?.addEventListener("input", apply);
  filter?.addEventListener("change", apply);

  renderProjects(DATA.projects);
}

// ====== Clean mode + reduce motion ======
function bindModes(){
  const toggleClean = $("#toggleClean");
  const toggleReduceMotion = $("#toggleReduceMotion");

  toggleClean?.addEventListener("click", () => {
    const on = document.body.classList.toggle("clean");
    toggleClean.setAttribute("aria-pressed", String(on));
  });

  toggleReduceMotion?.addEventListener("click", () => {
    const on = document.body.classList.toggle("reduce-motion");
    toggleReduceMotion.setAttribute("aria-pressed", String(on));
  });
}

// ====== Cursor glow ======
function bindCursorGlow(){
  const glow = $("#cursorGlow");
  if(!glow) return;

  window.addEventListener("pointermove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ====== Clock ======
function bindClock(){
  const el = $("#clock");
  const tick = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,"0");
    const mm = String(d.getMinutes()).padStart(2,"0");
    el.textContent = `${hh}:${mm}`;
  };
  tick();
  setInterval(tick, 1000 * 10);
}

// ====== Copy link ======
async function bindCopyLink(){
  const btn = $("#copyLink");
  btn?.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(window.location.href);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy Link"), 900);
    }catch{
      btn.textContent = "Copy failed";
      setTimeout(() => (btn.textContent = "Copy Link"), 900);
    }
  });
}

// ====== Print buttons ======
function bindPrint(){
  $("#printResume")?.addEventListener("click", () => window.print());
}

// ====== Contact form -> generates mailto draft ======
function bindContactForm(){
  const form = $("#contactForm");
  const hint = $("#emailDraftHint");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const msg = (fd.get("message") || "").toString().trim();

    const subject = encodeURIComponent("Portfolio Inquiry — Kenia Velasco");
    const body = encodeURIComponent(
`Hi Kenia,

${msg || "I’d love to connect about an opportunity. Are you available for a quick chat this week?"}

Best,
${name || "[Your Name]"}
${email ? "\n" + email : ""}`
    );

    const mailto = `mailto:you@email.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    if(hint){
      hint.textContent = "Opened your email client with a drafted message.";
    }
  });
}

// ====== Footer year ======
function fillMeta(){
  $("#year").textContent = String(new Date().getFullYear());
}

// ====== Init ======
function init(){
  enableDragging();
  bindWindowControls();

  renderSkills();
  renderDesign();
  bindProjectFilters();

  bindModes();
  bindCursorGlow();
  bindClock();
  bindCopyLink();
  bindPrint();
  bindContactForm();
  fillMeta();

  // Start with no windows open (feels like a clean landing).
  // If you WANT one to start open, uncomment:
  // openWindow("win-projects");
}



document.addEventListener("DOMContentLoaded", init);
