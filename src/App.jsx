import { useState, useEffect } from "react";

const NAV_LINKS = ["How It Works", "Features", "Learning Path", "For Who", "FAQ"];

const STEPS = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "Upload Your Resume",
    desc: "Drag and drop your CV or resume. Our NLP engine extracts skills, experience, and education automatically — no manual tagging needed.",
    tag: "NLP Extraction",
    color: "#6366f1",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Take Skill Assessments",
    desc: "Complete adaptive quizzes tailored to your target role. The AI dynamically adjusts difficulty based on your responses to pinpoint exact gaps.",
    tag: "Adaptive AI",
    color: "#0ea5e9",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
    ),
    title: "View Your Skill Gap Report",
    desc: "Get a detailed breakdown of strengths, gaps, and priority areas. Scored against industry benchmarks for your target role and seniority level.",
    tag: "Gap Analysis",
    color: "#10b981",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0Z" />
      </svg>
    ),
    title: "Follow Your Learning Path",
    desc: "Receive an ordered roadmap of curated resources — videos, articles, exercises, and projects — that adapts as you progress and improve.",
    tag: "Adaptive Path",
    color: "#f59e0b",
  },
];

const FEATURES = [
  { icon: "⚡", title: "Resume Parsing & NLP", desc: "Advanced NLP models extract and categorize 200+ skill types from any resume format. Instant structured skill profile." },
  { icon: "🧠", title: "AI Gap Detection", desc: "Benchmarked against thousands of job descriptions and industry standards. Pinpoints exact missing skills with confidence scores." },
  { icon: "🗺️", title: "Dynamic Learning Paths", desc: "Ordered sequences of resources — not just a list. Prerequisites respected, difficulty ramped, time estimates included." },
  { icon: "📈", title: "Progress Tracking", desc: "The path re-routes as you learn. Complete a module and the next recommendations update to reflect what you now know." },
  { icon: "🎯", title: "Role-Based Targeting", desc: "Select your target role — Full Stack Engineer, Data Scientist, Product Manager — and get gap analysis benchmarked to that role." },
  { icon: "📚", title: "Curated Resource Library", desc: "Access hand-vetted tutorials, research papers, video courses, and coding exercises ranked by community effectiveness scores." },
];

const SKILLS_DATA = [
  { name: "Machine Learning", current: 35, target: 85, priority: "HIGH" },
  { name: "React & TypeScript", current: 72, target: 90, priority: "MED" },
  { name: "System Design", current: 20, target: 80, priority: "HIGH" },
  { name: "Python", current: 68, target: 85, priority: "MED" },
  { name: "SQL & Databases", current: 55, target: 75, priority: "LOW" },
  { name: "Cloud (AWS/GCP)", current: 15, target: 70, priority: "HIGH" },
];

const PATH_RESOURCES = [
  { week: "Week 1–2", title: "ML Fundamentals", type: "Course", provider: "Coursera", time: "12h", done: true },
  { week: "Week 3–4", title: "Supervised Learning Deep Dive", type: "Course", provider: "fast.ai", time: "10h", done: true },
  { week: "Week 5–6", title: "Neural Networks & Deep Learning", type: "Video", provider: "3Blue1Brown", time: "8h", done: false },
  { week: "Week 7–8", title: "Build Your First ML Pipeline", type: "Project", provider: "SkillBridge Lab", time: "15h", done: false },
  { week: "Week 9–10", title: "System Design Primer", type: "Article", provider: "Grokking", time: "6h", done: false },
];

const AUDIENCES = [
  { label: "Students", icon: "🎓", desc: "Final-year students prepping for placements. Bridge the gap between academics and industry expectations in weeks, not months.", stat: "3.2× faster job readiness" },
  { label: "Professionals", icon: "💼", desc: "Working professionals targeting a role change or promotion. Identify exactly what to learn — nothing more, nothing less.", stat: "40% less study time" },
  { label: "Lifelong Learners", icon: "🌱", desc: "Self-driven learners who want structure without rigidity. Your personalized path grows with you at your own pace.", stat: "Fully self-paced" },
];

const FAQS = [
  { q: "How accurate is the AI gap analysis?", a: "Our models are trained on 50,000+ job descriptions and validated against real hiring outcomes. Gap detection accuracy sits at 89% precision against expert-reviewed benchmarks." },
  { q: "What resume formats are supported?", a: "PDF, DOCX, and plain text. Our NLP parser handles structured and unstructured formats including academic CVs, creative portfolios, and LinkedIn exports." },
  { q: "How does the learning path adapt over time?", a: "After each completed resource, you're prompted for a micro-assessment. The system re-scores your skill levels and re-prioritizes upcoming resources accordingly." },
  { q: "Are the learning resources free?", a: "Many resources link to free content (YouTube, open-source courses, documentation). Premium resources are clearly marked. SkillBridge curates the path; content providers set their own pricing." },
  { q: "Can I target multiple roles at once?", a: "Yes — you can maintain parallel paths. We surface shared prerequisites to minimize redundant learning across paths." },
];

const PRIORITY_COLORS = {
  HIGH: "text-red-500 bg-red-500/10 border-red-500/30",
  MED: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  LOW: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
};

const TYPE_COLORS = {
  Course: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
  Video: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  Article: "text-violet-500 bg-violet-500/10 border-violet-500/30",
  Project: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
};

function PriorityBadge({ level }) {
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${PRIORITY_COLORS[level]}`}>
      {level}
    </span>
  );
}

function ResourceTypeBadge({ type }) {
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${TYPE_COLORS[type]}`}>
      {type}
    </span>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", !dark);
  }, [dark]);

  const t = dark
    ? {
        page: "bg-[#080c18] text-[#e8eaf2]",
        nav: "border-[#1e2a4a] bg-[#080c18]/90",
        navLink: "text-[#6b7899] hover:text-[#e8eaf2]",
        navMobile: "border-[#1e2a4a] bg-[#080c18]",
        sectionAlt: "bg-[#0a0f1f]",
        border: "border-[#1e2a4a]",
        card: "bg-[#0f1628] border-[#1e2a4a]",
        heading: "text-white",
        body: "text-[#a8b0cc]",
        muted: "text-[#6b7899]",
        dimmed: "text-[#3d4f72]",
        skillBar: "bg-[#1e2a4a]",
        skillBarInner: "bg-[#1a2240]",
        tabInactive: "border-[#1e2a4a] text-[#6b7899] hover:text-white",
        stepNum: "text-[#1e2a4a]",
        resourceDone: "border-emerald-500/20 bg-emerald-500/5",
        resourcePending: "border-[#1e2a4a] bg-[#0a0f1f] hover:border-[#2d3a5e]",
        resourceConnector: "bg-[#1e2a4a]",
        outlineBtn: "border-[#1e2a4a] hover:border-[#2d3a5e] text-[#a8b0cc] hover:text-white",
        aiBox: "bg-indigo-500/10 border-indigo-500/20",
        faqBorder: "border-[#1e2a4a] bg-[#0f1628]",
        faqOpen: "border-indigo-500/30 bg-[#0f1628]",
        toggleTrack: "bg-indigo-600/30 border-indigo-500/50",
        toggleThumb: "translate-x-6 bg-indigo-400",
        toggleThumbMob: "translate-x-5 bg-indigo-400",
        techDot: "bg-indigo-500/60",
        techText: "text-[#6b7899]",
        footerText: "text-[#3d4f72]",
        skillText: "text-[#c8cde0]",
        divider: "bg-[#1e2a4a]",
      }
    : {
        page: "bg-[#f5f6fa] text-[#111827]",
        nav: "border-slate-200 bg-white/90",
        navLink: "text-slate-500 hover:text-slate-900",
        navMobile: "border-slate-200 bg-white",
        sectionAlt: "bg-white",
        border: "border-slate-200",
        card: "bg-white border-slate-200",
        heading: "text-slate-900",
        body: "text-slate-600",
        muted: "text-slate-400",
        dimmed: "text-slate-300",
        skillBar: "bg-slate-200",
        skillBarInner: "bg-slate-100",
        tabInactive: "border-slate-200 text-slate-400 hover:text-slate-700",
        stepNum: "text-slate-200",
        resourceDone: "border-emerald-500/20 bg-emerald-50",
        resourcePending: "border-slate-200 bg-slate-50 hover:border-slate-300",
        resourceConnector: "bg-slate-200",
        outlineBtn: "border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900",
        aiBox: "bg-indigo-50 border-indigo-200",
        faqBorder: "border-slate-200 bg-white",
        faqOpen: "border-indigo-300 bg-indigo-50/50",
        toggleTrack: "bg-slate-200 border-slate-300",
        toggleThumb: "translate-x-0 bg-white",
        toggleThumbMob: "translate-x-0 bg-white",
        techDot: "bg-indigo-400/60",
        techText: "text-slate-400",
        footerText: "text-slate-400",
        skillText: "text-slate-600",
        divider: "bg-slate-200",
      };

  const filteredSkills = SKILLS_DATA.filter((s) => {
    if (activeTab === 0) return s.priority === "HIGH" || s.priority === "MED";
    if (activeTab === 1) return s.current > 60;
    return true;
  });

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${t.page}`}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${t.nav}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-10">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <span className="text-indigo-400 text-sm font-bold font-display">S</span>
            </div>
            <span className="font-display font-700 text-lg tracking-tight">
              Skill<span className="text-indigo-500">Bridge</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-sm transition-colors whitespace-nowrap ${t.navLink}`}>
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className={`relative w-12 h-6 rounded-full border transition-all duration-300 flex items-center px-0.5 ${t.toggleTrack}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center shadow text-[11px] transition-transform duration-300 ${t.toggleThumb}`}>
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
            <div className={`w-px h-4 ${t.divider}`} />
            <button className={`text-sm transition-colors px-3 py-2 ${t.navLink}`}>Sign In</button>
            <button className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition-colors">
              Get Started Free
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className={`relative w-10 h-5 rounded-full border transition-all duration-300 flex items-center px-0.5 ${t.toggleTrack}`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center shadow text-[9px] transition-transform duration-300 ${t.toggleThumbMob}`}>
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
            <button className={t.navLink} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 transition-colors ${t.navMobile}`}>
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-sm transition-colors ${t.navLink}`}
                onClick={() => setMobileMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button className="w-full text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors mt-2">
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-6 grid-bg overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full bg-sky-500/6 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="font-mono text-xs text-indigo-400">AI-Powered · NLP-Driven · Adaptive</span>
              </div>

              <h1 className={`font-display text-5xl lg:text-6xl font-800 leading-[1.05] tracking-tight mb-6 ${t.heading}`}>
                Close Every<br />
                <span className="gradient-text">Skill Gap.</span><br />
                Faster.
              </h1>

              <p className={`text-lg leading-relaxed mb-8 max-w-lg ${t.body}`}>
                SkillBridge scans your resume, runs AI assessments, and generates a
                personalized learning roadmap that adapts as you grow. Stop guessing what to learn next.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-display font-600 text-base transition-all glow-primary hover:scale-[1.02]">
                  Analyze My Skills →
                </button>
                <button className={`border px-6 py-3 rounded-lg font-display font-500 text-base transition-colors ${t.outlineBtn}`}>
                  See Demo
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                {[["10,000+", "learners analyzed"], ["92%", "gap accuracy"], ["3.2×", "faster readiness"]].map(([val, label]) => (
                  <div key={label}>
                    <div className={`font-display font-700 text-xl ${t.heading}`}>{val}</div>
                    <div className={`text-xs ${t.muted}`}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="relative animate-float">
              <div className={`rounded-2xl border p-6 glow-accent transition-colors duration-300 ${t.card}`}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className={`font-mono text-[10px] mb-0.5 ${t.muted}`}>SKILL GAP REPORT</div>
                    <div className={`font-display font-600 text-sm ${t.heading}`}>Priya Sharma — ML Engineer</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-emerald-500">LIVE</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {SKILLS_DATA.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${t.body}`}>{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <PriorityBadge level={skill.priority} />
                          <span className={`font-mono text-[10px] ${t.muted}`}>{skill.current}%→{skill.target}%</span>
                        </div>
                      </div>
                      <div className={`relative h-1.5 rounded-full ${t.skillBar}`}>
                        <div className="progress-bar h-full rounded-full" style={{ width: `${skill.current}%` }} />
                        <div className="absolute top-0 h-full w-0.5 bg-slate-400/40 rounded" style={{ left: `${skill.target}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-5 pt-4 border-t flex items-center justify-between ${t.border}`}>
                  <span className={`font-mono text-[10px] ${t.muted}`}>3 HIGH priority gaps detected</span>
                  <button className="font-mono text-[10px] text-indigo-500 hover:text-indigo-400 transition-colors">
                    Generate Path →
                  </button>
                </div>
              </div>

              <div className={`absolute -bottom-4 -left-4 border rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-xl transition-colors duration-300 ${t.card}`}>
                <span className="text-xl">🧠</span>
                <div>
                  <div className={`font-mono text-[10px] ${t.muted}`}>AI INSIGHT</div>
                  <div className={`text-xs font-medium ${t.heading}`}>System Design: top gap for SDE-2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={`py-24 px-6 border-t transition-colors duration-300 ${t.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-indigo-500 mb-3 tracking-widest">HOW IT WORKS</div>
            <h2 className={`font-display text-4xl font-700 tracking-tight mb-4 ${t.heading}`}>
              From Resume to Roadmap<br />
              <span className={t.muted}>in Four Steps</span>
            </h2>
            <p className={`max-w-xl mx-auto ${t.body}`}>
              SkillBridge automates the entire process — from skill extraction to curated learning sequences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`relative rounded-xl border p-6 card-hover transition-colors duration-300 ${t.card}`}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gradient-to-r from-slate-300/30 to-transparent z-10" />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                    {step.icon}
                  </div>
                  <span className={`font-mono text-3xl font-600 ${t.stepNum}`}>{step.num}</span>
                </div>
                <div className="font-mono text-[10px] px-2 py-0.5 rounded border inline-block mb-3"
                  style={{ color: step.color, borderColor: `${step.color}30`, backgroundColor: `${step.color}10` }}>
                  {step.tag}
                </div>
                <h3 className={`font-display font-600 text-base mb-2 ${t.heading}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${t.muted}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={`py-24 px-6 border-t transition-colors duration-300 ${t.sectionAlt} ${t.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="font-mono text-xs text-sky-500 mb-3 tracking-widest">FEATURES</div>
              <h2 className={`font-display text-4xl font-700 tracking-tight mb-4 ${t.heading}`}>
                Built for<br />
                <span className="text-sky-500">Precision</span><br />
                Learning
              </h2>
              <p className={`leading-relaxed mb-6 ${t.body}`}>
                Every component of SkillBridge is designed to minimize wasted learning time and
                maximize skill acquisition velocity.
              </p>
              <button className="bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Explore All Features →
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className={`rounded-xl border p-5 card-hover transition-colors duration-300 ${t.card}`}>
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className={`font-display font-600 text-sm mb-2 ${t.heading}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${t.muted}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section id="learning-path" className={`py-24 px-6 border-t transition-colors duration-300 ${t.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-emerald-500 mb-3 tracking-widest">LEARNING PATH</div>
            <h2 className={`font-display text-4xl font-700 tracking-tight mb-4 ${t.heading}`}>
              Your Personalized Roadmap
            </h2>
            <p className={`max-w-xl mx-auto ${t.body}`}>
              See how SkillBridge organizes your learning sequence. Each resource is ordered by prerequisite dependency, not just topic.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
            <div className={`rounded-xl border p-6 transition-colors duration-300 ${t.card}`}>
              <div className="flex items-center justify-between mb-5">
                <div className={`font-display font-600 text-sm ${t.heading}`}>Skill Gap Analysis</div>
                <div className="flex gap-2">
                  {["Gaps", "Strengths", "All"].map((tab, i) => (
                    <button key={tab} onClick={() => setActiveTab(i)}
                      className={`font-mono text-[10px] px-2.5 py-1 rounded border transition-colors ${
                        activeTab === i
                          ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-500"
                          : t.tabInactive
                      }`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm ${t.skillText}`}>{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <PriorityBadge level={skill.priority} />
                        <span className={`font-mono text-[10px] ${t.muted}`}>{skill.current}%</span>
                      </div>
                    </div>
                    <div className={`relative h-2 rounded-full ${t.skillBarInner}`}>
                      <div className="progress-bar h-full rounded-full" style={{ width: `${skill.current}%` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-1 h-3 rounded bg-slate-400/30"
                        style={{ left: `${skill.target}%` }} title={`Target: ${skill.target}%`} />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className={`font-mono text-[9px] ${t.dimmed}`}>current</span>
                      <span className={`font-mono text-[9px] ${t.dimmed}`}>target ({skill.target}%)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-6 p-3 rounded-lg ${t.aiBox}`}>
                <div className="font-mono text-[10px] text-indigo-500 mb-1">AI RECOMMENDATION</div>
                <p className={`text-xs ${t.body}`}>
                  Prioritize Machine Learning and System Design. These are the top differentiators
                  for ML Engineer roles at FAANG-tier companies.
                </p>
              </div>
            </div>

            <div className={`rounded-xl border p-6 transition-colors duration-300 ${t.card}`}>
              <div className="flex items-center justify-between mb-5">
                <div className={`font-display font-600 text-sm ${t.heading}`}>Generated Learning Path</div>
                <div className={`font-mono text-[10px] ${t.muted}`}>Est. 10 weeks · 51h total</div>
              </div>

              <div className="space-y-3">
                {PATH_RESOURCES.map((r, i) => (
                  <div key={i} className={`relative flex gap-4 p-4 rounded-lg border transition-colors ${r.done ? t.resourceDone : t.resourcePending}`}>
                    <div className="flex-shrink-0 flex flex-col items-center pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        r.done ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-transparent"
                      }`}>
                        {r.done && (
                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {i < PATH_RESOURCES.length - 1 && (
                        <div className={`w-px flex-1 mt-1 min-h-4 ${r.done ? "bg-emerald-500/30" : t.resourceConnector}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-mono text-[9px] mb-0.5 ${t.muted}`}>{r.week}</div>
                          <div className={`text-sm font-medium ${r.done ? "text-emerald-600" : t.heading}`}>{r.title}</div>
                        </div>
                        <ResourceTypeBadge type={r.type} />
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`font-mono text-[10px] ${t.muted}`}>{r.provider}</span>
                        <span className={`font-mono text-[10px] ${t.dimmed}`}>·</span>
                        <span className={`font-mono text-[10px] ${t.muted}`}>{r.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-4 pt-4 border-t ${t.border}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={t.muted}>Overall progress</span>
                  <span className="font-mono text-emerald-500">40%</span>
                </div>
                <div className={`h-1.5 rounded-full ${t.skillBar}`}>
                  <div className="progress-bar h-full rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section id="for-who" className={`py-24 px-6 border-t transition-colors duration-300 ${t.sectionAlt} ${t.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-amber-500 mb-3 tracking-widest">FOR WHO</div>
            <h2 className={`font-display text-4xl font-700 tracking-tight mb-4 ${t.heading}`}>
              Built for Every<br />
              <span className="text-amber-500">Kind of Learner</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AUDIENCES.map((a) => (
              <div key={a.label} className={`rounded-xl border p-8 card-hover text-center transition-colors duration-300 ${t.card}`}>
                <div className="text-5xl mb-5">{a.icon}</div>
                <div className={`font-display font-700 text-xl mb-3 ${t.heading}`}>{a.label}</div>
                <p className={`text-sm leading-relaxed mb-6 ${t.body}`}>{a.desc}</p>
                <div className="inline-block px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20">
                  <span className="font-mono text-xs text-amber-600">{a.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STRIP */}
      <section className={`py-12 px-6 border-t transition-colors duration-300 ${t.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`font-mono text-[10px] text-center mb-8 tracking-widest ${t.dimmed}`}>POWERED BY</div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Natural Language Processing", "Transformer Models", "Adaptive Learning Algorithms", "Knowledge Graph Reasoning", "Collaborative Filtering", "Bayesian Skill Inference"].map((tech) => (
              <div key={tech} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${t.techDot}`} />
                <span className={`font-mono text-xs ${t.techText}`}>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-24 px-6 border-t transition-colors duration-300 ${t.sectionAlt} ${t.border}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs text-violet-500 mb-3 tracking-widest">FAQ</div>
            <h2 className={`font-display text-4xl font-700 tracking-tight ${t.heading}`}>Common Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className={`rounded-xl border transition-colors duration-200 ${openFaq === i ? t.faqOpen : t.faqBorder}`}>
                <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className={`font-display font-500 text-sm ${t.heading}`}>{faq.q}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${t.muted} ${openFaq === i ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className={`text-sm leading-relaxed ${t.body}`}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 px-6 border-t transition-colors duration-300 ${t.border}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-8 glow-primary">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className={`font-display text-5xl font-800 tracking-tight mb-4 ${t.heading}`}>
            Ready to Bridge<br />
            <span className="gradient-text">Your Skill Gap?</span>
          </h2>
          <p className={`text-lg mb-10 max-w-lg mx-auto ${t.body}`}>
            Upload your resume and get your personalized skill gap report in under 60 seconds.
            No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-display font-600 text-lg transition-all glow-primary hover:scale-[1.02]">
              Start Free Analysis
            </button>
            <button className={`border px-8 py-4 rounded-xl font-display font-500 text-lg transition-colors ${t.outlineBtn}`}>
              View Sample Report
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["Free to start", "No credit card", "Resume stays private", "Results in 60s"].map((item) => (
              <div key={item} className={`flex items-center gap-1.5 ${t.muted}`}>
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-emerald-500">
                  <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-10 px-6 transition-colors duration-300 ${t.border}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="text-indigo-500 text-xs font-bold font-display">S</span>
            </div>
            <span className="font-display font-600 text-sm">
              Skill<span className="text-indigo-500">Bridge</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Contact", "GitHub"].map((link) => (
              <a key={link} href="#" className={`font-mono text-xs transition-colors ${t.muted} hover:text-indigo-500`}>{link}</a>
            ))}
          </div>
          <div className={`font-mono text-[10px] ${t.footerText}`}>© 2025 SkillBridge · BE Final Year Project</div>
        </div>
      </footer>
    </div>
  );
}
