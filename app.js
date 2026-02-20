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

/* ------- Renderers ------- */
function renderCourses() {
  const grid = $("#courseGrid");
  if (!grid) return;

  const q = ($("#courseSearch").value || "").trim().toLowerCase();
  const level = $("#courseLevel").value;

  const auth = getAuth();
  const isStaff = auth?.role === "staff";

  const filtered = db.courses.filter((c) => {
    const hay = `${c.title} ${c.description} ${c.instructor} ${c.level} ${c.topics.join(" ")}`.toLowerCase();
    const okQ = !q || hay.includes(q);
    const okLevel = level === "all" || c.level === level;
    return okQ && okLevel;
  });

  grid.innerHTML = filtered.map((c) => {
    const tags = `
      <div class="kpi">
        <span class="tag accent">${c.level}</span>
        <span class="tag">${c.duration}</span>
        <span class="tag">${c.mode}</span>
      </div>
    `;

    const staffActions = isStaff ? `
      <div class="divider"></div>
      <div class="row">
        <div class="muted">Staff actions (demo)</div>
        <div class="actions">
          <button class="btn" onclick="alert('Demo: Edit course ${c.id}')">Edit</button>
          <button class="btn danger" onclick="alert('Demo: Remove course ${c.id}')">Remove</button>
        </div>
      </div>
    ` : "";

    return `
      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">${c.title}</div>
            <div class="muted small">Instructor: ${c.instructor} • Course ID: ${c.id}</div>
          </div>
          <span class="badge">Course</span>
        </div>
        <div class="card-body">
          <div class="muted">${c.description}</div>
          ${tags}
          <div class="divider"></div>
          <div class="muted small"><strong>Key topics:</strong> ${c.topics.join(", ")}</div>
          ${staffActions}
        </div>
      </div>
    `;
  }).join("");

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-body">
          <div class="card-title">No courses found</div>
          <div class="muted">Try a different search or level filter.</div>
        </div>
      </div>
    `;
  }
}

function renderPrograms() {
  const grid = $("#programGrid");
  if (!grid) return;

  grid.innerHTML = db.programs.map((p) => {
    const included = p.includes.map((id) => {
      const c = courseById(id);
      return `<li><strong>${c?.title || id}</strong> <span class="muted small">(${c?.level || ""})</span></li>`;
    }).join("");

    return `
      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">${p.name}</div>
            <div class="muted small">Program ID: ${p.id} • Duration: ${p.duration}</div>
          </div>
          <span class="badge">Program</span>
        </div>
        <div class="card-body">
          <div class="muted">${p.overview}</div>
          <div class="kpi" style="margin-top:10px;">
            <span class="tag ok">${p.level}</span>
            <span class="tag">${p.duration}</span>
            <span class="tag accent">${p.outcome}</span>
          </div>
          <div class="divider"></div>
          <div class="item-title">Courses included</div>
          <ul class="muted" style="margin:8px 0 0 18px;">
            ${included}
          </ul>
        </div>
      </div>
    `;
  }).join("");
}

/* ✅ Staff: remove the right "Staff" badge + remove the chip row */
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
          <!-- removed right-side badge -->
        </div>

        <!-- removed chips row entirely -->

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

  if (auth.role === "student") {
    $("#dashTitle").textContent = "Student Dashboard";
    $("#dashSub").textContent = "Courses you are learning and your progress focus.";

    const learning = assignments.student.learning.map(courseById).filter(Boolean);

    $("#leftTitle").textContent = "Your Learning Classes";
    $("#leftBadge").textContent = String(learning.length);

    $("#leftList").innerHTML = learning.map((c) => `
      <div class="item">
        <div>
          <div class="item-title">${c.title}</div>
          <div class="item-sub">${c.level} • ${c.duration} • Instructor: ${c.instructor}</div>
        </div>
        <span class="badge">Learning</span>
      </div>
    `).join("");

    const actions = ["View Programs", "Browse All Courses", "Contact Support"];
    $("#rightTitle").textContent = "Student Actions";
    $("#rightBadge").textContent = String(actions.length);

    $("#rightList").innerHTML = actions.map((x) => `
      <div class="item">
        <div>
          <div class="item-title">${x}</div>
          <div class="item-sub">Demo action</div>
        </div>
        <span class="badge">Action</span>
      </div>
    `).join("");
  } else {
    $("#dashTitle").textContent = "Staff Dashboard";
    $("#dashSub").textContent = "Classes you teach and areas you administer.";

    const teaching = assignments.staff.teaching.map(courseById).filter(Boolean);
    const admin = assignments.staff.admin;

    $("#leftTitle").textContent = "Classes You Teach";
    $("#leftBadge").textContent = String(teaching.length);

    $("#leftList").innerHTML = teaching.map((c) => `
      <div class="item">
        <div>
          <div class="item-title">${c.title}</div>
          <div class="item-sub">${c.level} • ${c.duration} • Course ID: ${c.id}</div>
        </div>
        <span class="badge">Teaching</span>
      </div>
    `).join("");

    $("#rightTitle").textContent = "Administration In-Charge";
    $("#rightBadge").textContent = String(admin.length);

    $("#rightList").innerHTML = admin.map((x) => `
      <div class="item">
        <div>
          <div class="item-title">${x}</div>
          <div class="item-sub">Demo: manage records</div>
        </div>
        <span class="badge">Admin</span>
      </div>
    `).join("");
  }
}

/* ------- Events ------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-route]");
  if (btn) routeTo(btn.getAttribute("data-route"));
});

document.addEventListener("input", (e) => {
  if (e.target?.id === "courseSearch" || e.target?.id === "courseLevel") renderCourses();
});

$("#btnLogout")?.addEventListener("click", () => {
  clearAuth();
  syncNav();
  setFlash("Logged out successfully.");
  routeTo("home");
});

$("#loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = ($("#email").value || "").trim().toLowerCase();
  const password = ($("#password").value || "").trim();
  const role = $("#role").value;

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

/* ------- Boot ------- */
(function boot() {
  syncNav();
  initRouting();
})();