/* FindToKnow - Single Page App (HTML/CSS/JS only)
   - Views: Home, Courses, Programs, Staff, Login, Dashboard
   - Demo auth: student@findtoknow.com / staff@findtoknow.com (password 1234)
*/

const db = {
  courses: [
    {
      id: "C-JFS",
      title: "Java Full Stack Development",
      level: "Advanced",
      duration: "6 months",
      mode: "Self-paced + Live",
      description: "Spring Boot, Microservices, REST, React, AWS, CI/CD.",
      instructor: "Dr. Rahul Sharma",
      topics: ["Spring Boot", "Microservices", "React", "AWS", "Kafka"],
    },
    {
      id: "C-PDE",
      title: "Python Data Engineering",
      level: "Intermediate",
      duration: "5 months",
      mode: "Self-paced + Projects",
      description: "Python, SQL, Spark basics, pipelines, Azure data services.",
      instructor: "Anita Rao",
      topics: ["Python", "SQL", "Azure", "ETL", "Databricks"],
    },
    {
      id: "C-CYB",
      title: "Cybersecurity Fundamentals",
      level: "Beginner",
      duration: "4 months",
      mode: "Self-paced",
      description: "Security basics, risk, IAM, logging/SIEM introduction.",
      instructor: "David Kumar",
      topics: ["Networking", "IAM", "Risk", "SIEM", "Phishing"],
    },
    {
      id: "C-DEV",
      title: "DevOps Essentials",
      level: "Intermediate",
      duration: "3 months",
      mode: "Hands-on Labs",
      description: "Git, CI/CD, Docker basics, IaC overview, monitoring.",
      instructor: "Anita Rao",
      topics: ["Git", "CI/CD", "Docker", "IaC", "Monitoring"],
    },
    {
      id: "C-CLD",
      title: "Cloud Computing with AWS",
      level: "Intermediate",
      duration: "3 months",
      mode: "Self-paced + Live",
      description: "Core AWS services, IAM, networking, deployment patterns.",
      instructor: "Dr. Rahul Sharma",
      topics: ["EC2", "S3", "IAM", "VPC", "Lambda"],
    },
    {
      id: "C-UIX",
      title: "Frontend: HTML/CSS/JS Mastery",
      level: "Beginner",
      duration: "2 months",
      mode: "Self-paced",
      description: "Modern HTML5, CSS layout, JS fundamentals and DOM.",
      instructor: "Priya Nair",
      topics: ["HTML5", "CSS3", "JavaScript", "DOM", "Responsive"],
    },
  ],
  programs: [
    {
      id: "P-SE",
      name: "Software Engineering Program",
      overview: "Full-stack + DevOps + Cloud foundations for engineering roles.",
      includes: ["C-UIX", "C-JFS", "C-DEV", "C-CLD"],
      outcome: "Build and deploy production-style apps with CI/CD and cloud basics.",
      duration: "9–12 months",
      level: "Intermediate → Advanced",
    },
    {
      id: "P-DAI",
      name: "Data & AI Program",
      overview: "Data pipelines, analytics foundations, and ML readiness.",
      includes: ["C-PDE", "C-CLD", "C-DEV"],
      outcome: "Design ETL/ELT workflows and deploy data services in cloud environments.",
      duration: "6–9 months",
      level: "Intermediate",
    },
    {
      id: "P-CSEC",
      name: "Cybersecurity Starter Program",
      overview: "Security fundamentals with practical risk and monitoring concepts.",
      includes: ["C-CYB", "C-DEV"],
      outcome: "Understand basic security controls, threats, and governance essentials.",
      duration: "5–6 months",
      level: "Beginner → Intermediate",
    },
  ],
  staff: [
    { id: "S-001", name: "Dr. Rahul Sharma", role: "Senior Instructor", focus: "Java, Cloud, Architecture" },
    { id: "S-002", name: "Anita Rao", role: "Program Coordinator", focus: "Data, DevOps, Delivery" },
    { id: "S-003", name: "David Kumar", role: "Cybersecurity Trainer", focus: "Security Fundamentals, SIEM" },
    { id: "S-004", name: "Priya Nair", role: "Frontend Instructor", focus: "HTML, CSS, JavaScript" },
    { id: "S-005", name: "Sameer Singh", role: "Admin Staff", focus: "Operations, Course Admin" },
  ],
  demoUsers: {
    student: { email: "student@findtoknow.com", password: "1234", name: "Aarav (Student)" },
    staff: { email: "staff@findtoknow.com", password: "1234", name: "Riya (Staff)" },
  },
};

const assignments = {
  student: { learning: ["C-UIX", "C-PDE", "C-CYB"] },
  staff: {
    teaching: ["C-JFS", "C-CLD"],
    admin: ["Course Administration", "Programs Catalog", "Staff Administration"],
  },
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ===================== Featured vertical scroller (Home) ===================== */
const topSoftwareCourses = [
  { title: "Java Full Stack", meta: "Java • Spring Boot • REST • React", tag: "Full Stack" },
  { title: "Python Full Stack", meta: "Python • Django/FastAPI • REST • React", tag: "Full Stack" },
  { title: "JavaScript + TypeScript", meta: "ES6+ • TypeScript • Node basics", tag: "Core" },
  { title: "React + Next.js", meta: "React • Next.js • UI patterns • State", tag: "Frontend" },
  { title: "Node.js + Express", meta: "APIs • Auth • Middleware • Testing", tag: "Backend" },
  { title: "SQL + Data Modeling", meta: "SQL • Indexing • Joins • Normalization", tag: "Database" },
  { title: "DSA + Problem Solving", meta: "Arrays • Trees • Graphs • Big-O", tag: "Interview" },
  { title: "System Design + Microservices", meta: "Scalability • Caching • Queues • APIs", tag: "Architecture" },
  { title: "DevOps Essentials", meta: "Linux • Git • CI/CD • Monitoring", tag: "DevOps" },
  { title: "Docker + Kubernetes", meta: "Containers • K8s basics • Deployments", tag: "Cloud-Native" },
  { title: "AWS Fundamentals", meta: "IAM • EC2 • S3 • VPC • Lambda", tag: "AWS" },
  { title: "Azure Fundamentals", meta: "Compute • Storage • Networking • Identity", tag: "Azure" },
  { title: "Cybersecurity Fundamentals", meta: "Threats • IAM • SIEM basics • Risk", tag: "Security" },
  { title: "Data Engineering", meta: "ETL/ELT • Spark • Warehouses • Pipelines", tag: "Data" },
  { title: "Machine Learning Basics", meta: "Supervised • Evaluation • Projects", tag: "AI/ML" },
];

function initTopCoursesScroller() {
  const track = document.querySelector("#topCoursesTrack");
  const scroller = document.querySelector("#topCoursesScroller");
  if (!track || !scroller) return;

  const renderOnce = () => {
    const itemHtml = topSoftwareCourses.map((c) => `
      <div class="vitem" role="listitem">
        <div class="vitem-left">
          <div class="vitem-title">${c.title}</div>
          <div class="vitem-meta">${c.meta}</div>
        </div>
        <div class="vitem-tag">${c.tag}</div>
      </div>
    `).join("");

    // Duplicate for seamless looping
    track.innerHTML = itemHtml + itemHtml;

    // Measure after paint so distance is exact
    requestAnimationFrame(() => {
      const half = Math.max(1, Math.floor(track.scrollHeight / 2));
      track.style.setProperty("--vscrollDist", `${half}px`);

      // Smooth readable speed
      const dur = Math.max(22, Math.round(topSoftwareCourses.length * 2.0));
      track.style.setProperty("--vscrollDur", `${dur}s`);
    });
  };

  renderOnce();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderOnce, 180);
  });
}


function setFlash(msg, type = "ok") {
  const el = $("#flash");
  el.textContent = msg;
  el.classList.remove("hidden", "ok", "err");
  el.classList.add(type === "err" ? "err" : "ok");
  window.setTimeout(() => el.classList.add("hidden"), 2800);
}

function getAuth() {
  try { return JSON.parse(localStorage.getItem("ftk_auth") || "null"); }
  catch { return null; }
}
function setAuth(obj) { localStorage.setItem("ftk_auth", JSON.stringify(obj)); }
function clearAuth() { localStorage.removeItem("ftk_auth"); }

function courseById(id) { return db.courses.find((c) => c.id === id); }

function routeTo(view) {
  const views = $$(".view");
  views.forEach((v) => v.classList.add("hidden"));
  const target = document.querySelector(`[data-view="${view}"]`);
  if (target) target.classList.remove("hidden");

  if (view === "courses") renderCourses();
  if (view === "programs") renderPrograms();
  if (view === "staff") renderStaff();
  if (view === "dashboard") renderDashboard();

  location.hash = view;
}

function syncNav() {
  const auth = getAuth();
  $("#navPublic").classList.toggle("hidden", !!auth);
  $("#navAuthed").classList.toggle("hidden", !auth);
}

function initRouting() {
  const hash = (location.hash || "#home").replace("#", "");
  const allowed = ["home", "courses", "programs", "staff", "login", "dashboard"];
  routeTo(allowed.includes(hash) ? hash : "home");
}

/* ===================== Renderers ===================== */

function renderCourses() {
  const tbody = $("#courseGrid");
  if (!tbody) return;

  const q = ($("#courseSearch").value || "").trim().toLowerCase();
  const level = $("#courseLevel").value;

  const filtered = db.courses.filter((c) => {
    const hay = `${c.title} ${c.instructor} ${c.level} ${c.topics.join(" ")}`.toLowerCase();
    const okQ = !q || hay.includes(q);
    const okLevel = level === "all" || c.level === level;
    return okQ && okLevel;
  });

  tbody.innerHTML = filtered.map((c) => `
    <tr>
      <td><span class="mono">${c.id}</span></td>
      <td><div class="t-title">${c.title}</div></td>
      <td>${c.instructor}</td>
      <td><span class="pill">${c.level}</span></td>
      <td>${c.duration}</td>
      <td>${c.mode}</td>
      <td class="muted small">${c.topics.join(", ")}</td>
    </tr>
  `).join("");

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="muted" style="text-align:center;padding:20px;">
          No courses found. Try a different search or level filter.
        </td>
      </tr>
    `;
  }
}

function renderPrograms() {
  const tbody = $("#programGrid");
  if (!tbody) return;

  tbody.innerHTML = db.programs.map((p) => {
    const includedTitles = p.includes
      .map((id) => courseById(id)?.title || id)
      .join(", ");

    return `
      <tr>
        <td><span class="mono">${p.id}</span></td>
        <td>
          <div class="t-title">${p.name}</div>
          <div class="muted small">${p.overview}</div>
        </td>
        <td><span class="pill">${p.level}</span></td>
        <td>${p.duration}</td>
        <td class="muted small">${includedTitles}</td>
        <td class="muted small">${p.outcome}</td>
      </tr>
    `;
  }).join("");
}

function initialsFromName(name){
  const parts = (name || "").trim().split(/\s+/);
  const a = parts[0]?.[0] || "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function renderStaff() {
  const wrap = $("#staffGrid");
  if (!wrap) return;

  wrap.innerHTML = db.staff.map((s) => `
    <div class="staff-row">
      <div class="staff-photo" aria-hidden="true">
        <span>${initialsFromName(s.name)}</span>
      </div>

      <div class="staff-info">
        <div class="staff-top">
          <div>
            <h3 class="staff-name">${s.name}</h3>
            <div class="staff-id">Staff ID: ${s.id}</div>
          </div>
        </div>

        <div class="staff-divider"></div>

        <div class="staff-bottom">
          <div><span class="staff-k">Role:</span> <span class="staff-v">${s.role}</span></div>
          <div><span class="staff-k">Focus:</span> <span class="staff-v">${s.focus}</span></div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderDashboard() {
  const auth = getAuth();
  if (!auth) {
    setFlash("Please login to access your dashboard.", "err");
    routeTo("login");
    return;
  }

  $("#userName").textContent = auth.name;
  $("#userMeta").textContent = `${auth.role.toUpperCase()} • ${auth.email}`;

  const dashStats = $("#dashStats");
  const leftHead = $("#leftHead");
  const rightHead = $("#rightHead");
  const leftTable = $("#leftTable");
  const rightTable = $("#rightTable");

  if (auth.role === "student") {
    $("#dashTitle").textContent = "Student Dashboard";
    $("#dashSub").textContent = "Overview of your enrolled courses and next actions.";

    const learning = assignments.student.learning.map(courseById).filter(Boolean);

    dashStats.innerHTML = `
      <div class="stat-card">
        <div class="stat-k">Enrolled Courses</div>
        <div class="stat-v">${learning.length}</div>
        <div class="stat-sub">Active this term</div>
      </div>
      <div class="stat-card">
        <div class="stat-k">Programs Available</div>
        <div class="stat-v">${db.programs.length}</div>
        <div class="stat-sub">Structured pathways</div>
      </div>
      <div class="stat-card">
        <div class="stat-k">Suggested Focus</div>
        <div class="stat-v">Weekly</div>
        <div class="stat-sub">Complete 2 modules</div>
      </div>
    `;

    $("#leftTitle").textContent = "My Courses";
    $("#leftBadge").textContent = String(learning.length);

    leftHead.innerHTML = `
      <tr>
        <th>Course</th>
        <th>Level</th>
        <th>Duration</th>
        <th>Instructor</th>
      </tr>
    `;
    leftTable.innerHTML = learning.map((c) => `
      <tr>
        <td><div class="t-title">${c.title}</div><div class="muted small">${c.id}</div></td>
        <td><span class="pill">${c.level}</span></td>
        <td>${c.duration}</td>
        <td>${c.instructor}</td>
      </tr>
    `).join("");

    const actions = [
      { a: "Browse Programs", d: "Explore structured learning paths" },
      { a: "View Courses", d: "Add a course to your plan" },
      { a: "Contact Support", d: "Help with enrollment or access" },
    ];

    $("#rightTitle").textContent = "Student Actions";
    $("#rightBadge").textContent = String(actions.length);

    rightHead.innerHTML = `
      <tr>
        <th>Action</th>
        <th>Details</th>
      </tr>
    `;
    rightTable.innerHTML = actions.map((x) => `
      <tr>
        <td><div class="t-title">${x.a}</div></td>
        <td class="muted small">${x.d}</td>
      </tr>
    `).join("");

  } else {
    $("#dashTitle").textContent = "Staff Dashboard";
    $("#dashSub").textContent = "Teaching summary and administration responsibilities.";

    const teaching = assignments.staff.teaching.map(courseById).filter(Boolean);
    const admin = assignments.staff.admin;

    dashStats.innerHTML = `
      <div class="stat-card">
        <div class="stat-k">Classes Teaching</div>
        <div class="stat-v">${teaching.length}</div>
        <div class="stat-sub">Current assignments</div>
      </div>
      <div class="stat-card">
        <div class="stat-k">Admin Areas</div>
        <div class="stat-v">${admin.length}</div>
        <div class="stat-sub">Management roles</div>
      </div>
      <div class="stat-card">
        <div class="stat-k">Total Courses</div>
        <div class="stat-v">${db.courses.length}</div>
        <div class="stat-sub">Catalog size</div>
      </div>
    `;

    $("#leftTitle").textContent = "Classes You Teach";
    $("#leftBadge").textContent = String(teaching.length);

    leftHead.innerHTML = `
      <tr>
        <th>Course</th>
        <th>Level</th>
        <th>Duration</th>
        <th>Mode</th>
      </tr>
    `;
    leftTable.innerHTML = teaching.map((c) => `
      <tr>
        <td><div class="t-title">${c.title}</div><div class="muted small">${c.id}</div></td>
        <td><span class="pill">${c.level}</span></td>
        <td>${c.duration}</td>
        <td>${c.mode}</td>
      </tr>
    `).join("");

    $("#rightTitle").textContent = "Administration Areas";
    $("#rightBadge").textContent = String(admin.length);

    rightHead.innerHTML = `
      <tr>
        <th>Area</th>
        <th>Notes</th>
      </tr>
    `;
    rightTable.innerHTML = admin.map((x) => `
      <tr>
        <td><div class="t-title">${x}</div></td>
        <td class="muted small">Demo access enabled</td>
      </tr>
    `).join("");
  }
}

/* ===================== Events ===================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-route]");
  if (btn) routeTo(btn.getAttribute("data-route"));
});

document.addEventListener("input", (e) => {
  if (e.target?.id === "courseSearch" || e.target?.id === "courseLevel") renderCourses();
});

document.querySelector("#btnLogout")?.addEventListener("click", () => {
  clearAuth();
  syncNav();
  setFlash("Logged out successfully.");
  routeTo("home");
});

document.querySelector("#loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = (document.querySelector("#email").value || "").trim().toLowerCase();
  const password = (document.querySelector("#password").value || "").trim();
  const role = document.querySelector("#role").value;

  const expected = db.demoUsers[role];
  if (!expected || email !== expected.email || password !== expected.password) {
    setFlash("Invalid credentials (try the demo email + password 1234).", "err");
    return;
  }

  setAuth({ role, email: expected.email, name: expected.name });
  syncNav();
  setFlash("Login successful!");
  routeTo("dashboard");
});

/* ===================== Boot ===================== */
(function boot() {
  syncNav();
  initTopCoursesScroller();
  initRouting();
})();