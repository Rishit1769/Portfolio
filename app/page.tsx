"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { ScrambleText } from "../components/ScrambleText";
import { Typewriter } from "../components/Typewriter";
import { TrackingBot } from "../components/TrackingBot";
import { AuroraBackground } from "../components/AuroraBackground";
import TechnicalArsenal from "../components/TechnicalArsenal";
import { GitHubCalendar } from "react-github-calendar";

export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [termHistory, setTermHistory] = useState<string[]>([]);
  const [termOutput, setTermOutput] = useState<React.ReactNode[]>([
    <div key="init">Welcome to Rishit's Terminal. Type 'help' to see commands.</div>,
  ]);
  const [termInput, setTermInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const termInputRef = useRef<HTMLInputElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cx = useRef(0);
  const cy = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
      setIsAtBottom(maxScroll > 0 && scrollY >= maxScroll - 10);
      if (heroRef.current && scrollY < window.innerHeight) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroRef.current.style.opacity = (1 - (scrollY / window.innerHeight) * 1.5).toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => termInputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  const toggleTheme = (e?: React.MouseEvent) => {
    const newTheme = theme === "light" ? "dark" : "light";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => any };

    if (!doc.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        { clipPath: newTheme === "light" ? clipPath : [...clipPath].reverse() },
        {
          duration: 700,
          easing: "cubic-bezier(0.8, 0, 0.2, 1)",
          pseudoElement:
            newTheme === "light"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        }
      );
    });
  };

  const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = termInput.toLowerCase().trim();
      let newOutput = [
        ...termOutput,
        <div key={Date.now()} style={{ color: "var(--acc)" }}>
          <span>rishit@portfolio:~$ </span>
          {val}
        </div>,
      ];

      if (val) {
        setTermHistory([...termHistory, val]);
        setHistoryIdx(termHistory.length + 1);
      }

      switch (val) {
        case "help":
          newOutput.push(
            <div key={Date.now() + 1}>
              Available: about, work, skills, experience, education, contact, theme, clear, exit
            </div>
          );
          break;
        case "about":
          newOutput.push(
            <div key={Date.now() + 1}>
              I am Rishit, a developer focused on the intersection of aesthetic
              design and architectural integrity, with a methodology centered on
              scalability, maintainability, and performance.
            </div>
          );
          break;
        case "work":
          newOutput.push(
            <div key={Date.now() + 1}>
              Projects: Cloud Campus, Women Safety & Emergency Assistance Platform, AI Based Financial Habit Builder & Wealth Growth Tracker, University Timetable Generator.
            </div>
          );
          break;
        case "skills":
          newOutput.push(
            <div key={Date.now() + 1}>
              The Arsenal: TypeScript, JavaScript, Python, C, Next.js, React, Node.js, Express.js, Tailwind CSS, MySQL, Redis, Firebase, AWS (S3, EC2, IAM), Nginx, Docker, Linux Server Admin.
            </div>
          );
          break;
        case "experience":
          newOutput.push(
            <div key={Date.now() + 1}>
              Experience: Chief Financial Officer @ Annadaan (2024 — 2026), Full Stack Web Development Intern @ Unified Mentor (Apr. 2026 — Jun. 2026).
            </div>
          );
          break;
        case "education":
          newOutput.push(
            <div key={Date.now() + 1}>
              Education: BE in AI & Data Science @ Thakur College of Engineering & Technology (2024 — 2028).
            </div>
          );
          break;
        case "contact":
          newOutput.push(
            <div key={Date.now() + 1}>
              Reach out at: singhrishit471@gmail.com
            </div>
          );
          break;
        case "theme":
          toggleTheme();
          break;
        case "clear":
          newOutput = [];
          break;
        case "exit":
          setIsTerminalOpen(false);
          break;
        default:
          if (val) {
            newOutput.push(
              <div key={Date.now() + 1} style={{ color: "var(--acc)" }}>
                Command not found: {val}. Type &apos;help&apos; for list.
              </div>
            );
          }
      }

      setTermOutput(newOutput);
      setTermInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setTermInput(termHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx < termHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setTermInput(termHistory[nextIdx]);
      } else {
        setHistoryIdx(termHistory.length);
        setTermInput("");
      }
    }
  };

  useEffect(() => {
    let reqId: number;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    mouseRef.current = { x: initX, y: initY };
    cx.current = initX;
    cy.current = initY;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const lerpCursor = () => {
      const { x, y } = mouseRef.current;
      cx.current += (x - cx.current) * 0.15;
      cy.current += (y - cy.current) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${cx.current}px, ${cy.current}px) translate(-50%, -50%)`;
      }
      reqId = requestAnimationFrame(lerpCursor);
    };
    lerpCursor();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.classList.contains("hover-link")) {
        document.body.classList.add("hover-link");
      }
      if (target.closest("button") || target.classList.contains("hover-btn")) {
        document.body.classList.add("hover-btn");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.classList.contains("hover-link")) {
        document.body.classList.remove("hover-link");
      }
      if (target.closest("button") || target.classList.contains("hover-btn")) {
        document.body.classList.remove("hover-btn");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    const magnetics = document.querySelectorAll<HTMLElement>(".magnetic");
    const handleMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };
    const handleLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = "translate(0px, 0px)";
    };

    magnetics.forEach((m) => {
      m.addEventListener("mousemove", handleMove);
      m.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      magnetics.forEach((m) => {
        m.removeEventListener("mousemove", handleMove);
        m.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".spotlight-card");
    const handleSpotlight = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    cards.forEach((card) => card.addEventListener("mousemove", handleSpotlight));
    return () => cards.forEach((card) => card.removeEventListener("mousemove", handleSpotlight));
  }, []);

  useEffect(() => {
    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const handleTiltMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
    };
    const handleTiltLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.35s, box-shadow 0.35s";
    };
    const handleTiltEnter = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transition = "transform 0.08s linear, border-color 0.35s, box-shadow 0.35s";
    };
    tiltCards.forEach((c) => {
      c.addEventListener("mouseenter", handleTiltEnter);
      c.addEventListener("mousemove", handleTiltMove);
      c.addEventListener("mouseleave", handleTiltLeave);
    });
    return () => tiltCards.forEach((c) => {
      c.removeEventListener("mouseenter", handleTiltEnter);
      c.removeEventListener("mousemove", handleTiltMove);
      c.removeEventListener("mouseleave", handleTiltLeave);
    });
  }, []);

  return (
    <>
      <div id="loadbar"></div>
      <div id="grain"></div>
      <div id="cd" ref={cursorDotRef}></div>
      <div id="cr" ref={cursorRingRef}></div>
      <AuroraBackground isLight={theme === "light"} />
      <div id="global-grid-interactive"></div>

      {/* Scroll Progress Ring */}
      <div
        id="scroll-ring-wrap"
        style={{ opacity: scrollPct > 0.01 && !isAtBottom ? 1 : 0 }}
        aria-hidden="true"
      >
        <svg id="scroll-ring-svg" viewBox="0 0 36 36">
          <circle
            cx="18" cy="18" r="14"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1.5"
          />
          <circle
            cx="18" cy="18" r="14"
            fill="none"
            stroke="var(--acc)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 14}`}
            strokeDashoffset={`${2 * Math.PI * 14 * (1 - scrollPct)}`}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.15s ease" }}
          />
        </svg>
        <span id="scroll-pct-label">{Math.round(scrollPct * 100)}<sup>%</sup></span>
      </div>

      <nav id="nav" className={scrolled ? "s" : ""}>
        <div className="n-logo">
          <span className="n-logo-dot"></span>
          rishit@portfolio:~
        </div>
        <div className="n-links">
          <a href="#about">
            <span className="t1">About</span>
            <span className="t2">About</span>
          </a>
          <a href="#skills">
            <span className="t1">Stack</span>
            <span className="t2">Stack</span>
          </a>
          <a href="#projects">
            <span className="t1">Work</span>
            <span className="t2">Work</span>
          </a>
          <a href="#experience">
            <span className="t1">Experience</span>
            <span className="t2">Experience</span>
          </a>
          <a href="#education">
            <span className="t1">Education</span>
            <span className="t2">Education</span>
          </a>
          <a href="#contact">
            <span className="t1">Contact</span>
            <span className="t2">Contact</span>
          </a>
        </div>
        <div className="n-actions">
          <button className="n-term hover-btn" onClick={() => setIsTerminalOpen(true)}>
            <span>&gt;_ terminal</span>
            <span className="n-kbd">⌘K</span>
          </button>
        </div>
      </nav>

      <section id="hero">
        <div className="h-grid"></div>
        <div className="h-content" ref={heroRef}>
          <div className="h-eyebrow">FULL-STACK DEVELOPER / MUMBAI, IN</div>
          <h1 className="h-title">
            <span>
              <ScrambleText text="RISHIT" />
            </span>
            <br />
            <em>
              <ScrambleText text="DEVELOPER" />
            </em>
          </h1>
          <div className="h-bottom">
            <p className="h-desc">
              Specializing in building <br />
              <Typewriter
                words={["robust backends.", "fluid frontends.", "scalable architectures.", "digital experiences."]}
                className="typer-text"
              />
            </p>
            <div className="h-status">
              <TrackingBot />
              <button
                onClick={toggleTheme}
                className="h-orbit magnetic hover-btn"
                aria-label="Toggle Theme"
              >
                <div className="h-core"></div>
                <div className="h-ring"></div>
              </button>
            </div>
            <div className="h-ctas">
              <a href="/Resume.pdf" className="btn-p magnetic hover-btn" download="Rishit_Resume.pdf">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        onMouseMove={(e) => {
          const card = aboutCardRef.current;
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const dx = (rect.width / 2 - (e.clientX - rect.left)) / 20;
          const dy = (e.clientY - rect.top - rect.height / 2) / 20;
          card.style.transform = `rotateY(${dx}deg) rotateX(${dy}deg)`;
        }}
        onMouseLeave={() => {
          const card = aboutCardRef.current;
          if (!card) return;
          card.style.transform = "rotateY(0deg) rotateX(0deg)";
        }}
      >
        <span className="s-num rv">01 — CONCEPT</span>
        <h2 className="s-title rv">
          The <em>Philosophy</em>
        </h2>
        <div className="about-grid">
          <div className="about-text rv">
            <p>
              I am <strong>Rishit</strong>, a developer who believes that code is as
              much about <strong>art</strong> as it is about <strong>logic</strong>.
              I thrive at the intersection of aesthetic design and architectural integrity.
            </p>
            <p>
              With over 3 years of experience in the full-stack landscape, I&apos;ve developed
              a methodology centered on <strong>scalability</strong>, <strong>maintainability</strong>,
              and <strong>performance</strong>.
            </p>
          </div>
          <div className="a-card-wrap rv">
            <div className="about-card" ref={aboutCardRef}>
              <div className="ac-head">
                <div className="ac-logo">R</div>
                <div className="ac-tag">DEV.SPEC_2026</div>
              </div>
              <div className="ac-stats">
                {[
                  { count: 2, label: "Years of Dev" },
                  { count: 10, label: "Products Shipped" },
                  { count: 100, label: "PRs Merged" },
                  { val: "∞", label: "Coffees" },
                ].map((stat, i) => (
                  <div key={i} className="ac-stat">
                    <span className="ac-val" data-count={stat.count}>
                      {stat.val || `${stat.count}+`}
                    </span>
                    <span className="ac-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <TechnicalArsenal />
      </section>

      <section id="projects">
        <span className="s-num rv">03 — SELECTION</span>
        <h2 className="s-title rv">
          Recent <em>Artifacts</em>
        </h2>
        <div className="project-grid">
          {[
            {
              num: "01",
              title: "Cloud Campus",
              date: "JAN. 2026 — PRESENT",
              desc: "A comprehensive, role-based educational management system with AI integrations and high-speed caching.",
              tags: ["Next.js", "TypeScript", "Express", "MySQL", "MinIO", "Gemini API", "Docker"],
              github: "https://github.com/Rishit1769/ERP",
              live: "#",
            },
            {
              num: "02",
              title: "Women Safety & Emergency Assistance Platform",
              date: "JAN. 2026 — PRESENT",
              desc: "A full-stack women safety platform with real-time SOS alerts, live location sharing via OpenStreetMap, emergency contact management, and an admin dashboard for incident tracking.",
              tags: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Express", "OpenStreetMap"],
              github: "https://github.com/Rishit1769/Women-Safety-Emergency-Assistance-Platform",
              live: "#",
            },
            {
              num: "03",
              title: "AI Based Financial Habit Builder & Wealth Growth Tracker",
              date: "2026 — PRESENT",
              desc: "An AI-powered personal finance platform that analyzes spending patterns, builds personalized financial habits, and tracks wealth growth over time. Features Gemini-driven insights, automated email reports via Nodemailer, and secure cloud storage with MinIO on AWS.",
              tags: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL", "Gemini API", "Nodemailer", "MinIO", "AWS"],
              github: "https://github.com/Rishit1769/AI-Based-Financial-Habit-Builder-Wealth-Growth-Tracker",
              live: "#",
            },
            {
              num: "04",
              title: "University Timetable Generator",
              date: "2026 — PRESENT",
              desc: "A university timetable generation system that uses constraint programming (Google OR-Tools) to handle complex mathematics for preventing double-bookings. Built with a React/Tailwind frontend, interactive drag-and-drop calendar UI, and a high-performance FastAPI Python backend storing relational data in MySQL.",
              tags: ["React", "Tailwind CSS", "FullCalendar", "Axios", "Python", "FastAPI", "MySQL", "OR-Tools"],
              github: "https://github.com/Rishit1769/Timetable-Generator",
              live: "#",
            },
          ].map((proj, i) => (
            <div key={proj.num} className="project-card spotlight-card rv" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <div className="p-card-body">
                <div className="p-card-date">{proj.date}</div>
                <h3 className="p-card-title">{proj.title}</h3>
                <p className="p-card-desc">{proj.desc}</p>
                <div className="p-card-tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="p-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-card-actions">
                <a href={proj.github} target="_blank" rel="noreferrer" className="p-card-btn outline hover-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  Source
                </a>
                <a href={proj.live} target="_blank" rel="noreferrer" className="p-card-btn filled hover-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Live Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <span className="s-num rv">04 — HISTORY</span>
        <h2 className="s-title rv">
          <em>Experience</em>
        </h2>
        <div className="exp-list">
          <div className="exp-row rv" style={{ transitionDelay: "0.1s" }}>
            <div className="exp-meta">
              <span className="exp-time">2024 — 2026</span>
            </div>
            <div>
              <div className="exp-role">Chief Financial Officer</div>
              <div className="exp-company">Annadaan</div>
              <p className="exp-desc">
                Leading financial strategy and operations for Annadaan. Responsible for fund allocation,
                comprehensive budgeting, and ensuring absolute financial transparency to maximize the impact of
                charitable initiatives. Streamlined financial tracking systems and optimized resource distribution models.
              </p>
            </div>
          </div>
          <div className="exp-row rv" style={{ transitionDelay: "0.2s" }}>
            <div className="exp-meta">
              <span className="exp-time">APR. 2026 — JUN. 2026</span>
            </div>
            <div>
              <div className="exp-role">Full Stack Web Development Intern</div>
              <div className="exp-company">Unified Mentor</div>
              <p className="exp-desc">
                Contributed to full stack development initiatives, building robust web applications and
                optimizing frontend and backend components. Implemented modern UI/UX principles and integrated
                RESTful APIs, enhancing overall system performance and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="education">
        <span className="s-num rv">05 — FORMATION</span>
        <h2 className="s-title rv">
          <em>Education</em>
        </h2>

        <div className="edu-timeline">
          {[
            {
              period: "2009 — 2022",
              institution: "Seven Square Academy",
              degree: "Secondary School Certificate (SSC)",
              type: "SCHOOL",
            },
            {
              period: "2022 — 2024",
              institution: "Shree LR Tiwari Degree College",
              degree: "Higher Secondary Certificate (HSC)",
              sub: "Arts, Commerce & Science",
              type: "COLLEGE",
            },
            {
              period: "2024 — 2028",
              institution: "Thakur College of Engineering & Technology",
              degree: "Bachelor of Engineering (BE)",
              sub: "Major · Artificial Intelligence & Data Science",
              type: "UNIVERSITY",
            },
          ].map((edu, i) => (
            <div key={i} className="edu-row rv" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <div className="edu-left">
                <span className="edu-period">{edu.period}</span>
                <span className="edu-type">{edu.type}</span>
              </div>
              <div className="edu-connector">
                <div className="edu-dot" />
                {i < 2 && <div className="edu-line" />}
              </div>
              <div className="edu-right">
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-degree">{edu.degree}</div>
                {edu.sub && <div className="edu-sub">{edu.sub}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: "5rem" }}>
          <span className="cert-eyebrow rv">Certifications</span>
          <div className="cert-grid">
            {[
              {
                title: "Full Stack Web Development",
                issuer: "Hitesh Choudhary",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                ),
                file: "/certificates/fullstack-web-dev.pdf",
              },
              {
                title: "AWS: Zero to Hero",
                issuer: "Memi Lavi",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                ),
                file: "/certificates/aws-zero-to-hero.pdf",
              },
              {
                title: "Arch Linux Fundamentals",
                issuer: "Self-certified",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                ),
                file: "/certificates/arch-linux.pdf",
              },
              {
                title: "The Ultimate DevOps Bootcamp",
                issuer: "KodeKloud",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                ),
                file: "/certificates/devops-bootcamp.pdf",
              },
            ].map((cert, i) => (
              <div key={i} className="cert-card tilt-card rv spotlight-card" style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-body">
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
                <a
                  href={cert.file}
                  download
                  className="cert-download hover-btn"
                  aria-label={`Download ${cert.title} certificate`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="github-activity">
        <span className="s-num rv">06 — OPEN SOURCE</span>
        <h2 className="s-title rv">
          <em>Contributions</em>
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem", width: "100%", padding: "0 1rem" }} className="rv">
          <div style={{ background: "var(--bg1)", padding: "2.5rem", borderRadius: "12px", border: "1px solid var(--line)", boxShadow: "0 20px 40px var(--shadow)", color: "var(--t1)", width: "max-content", maxWidth: "100%", overflowX: "auto" }}>
            {isMounted && (
              <GitHubCalendar 
                username="Rishit1769" 
                colorScheme={theme} 
                fontSize={14}
                blockSize={14}
                theme={{
                  light: ['#e8e8e8', '#fbc1ce', '#f98fa7', '#f6537a', '#ff3366'],
                  dark: ['#1a1a1a', '#3f422c', '#686d49', '#96a066', '#d2db8e']
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-wrap">
          <span className="s-num rv">07 — CONNECT</span>
          <h2 className="c-big rv">
            READY TO BUILD
            <br />
            <em>SOMETHING</em> REAL?
          </h2>

          <div className="rv" style={{ marginTop: "1rem" }}>
            <a href="mailto:singhrishit471@gmail.com" className="btn-p magnetic hover-btn" style={{ display: "inline-block" }}>
              Connect via Email
            </a>
          </div>

          <div className="contact-socials rv">
            <a href="https://www.linkedin.com/in/rishit-singh-586742361/" target="_blank" rel="noreferrer" className="hover-link">LinkedIn</a>
            <a href="https://github.com/Rishit1769" target="_blank" rel="noreferrer" className="hover-link">GitHub</a>
            <a href="https://leetcode.com/u/ovvdu8UyhD/" target="_blank" rel="noreferrer" className="hover-link">LeetCode</a>
          </div>
        </div>
      </section>

      <footer>
        <div>© 2025 RISHIT — MUMBAI, IN</div>
        <div>DESIGNED TO PERFORM</div>
      </footer>

      <div
        id="term-overlay"
        className={isTerminalOpen ? "active" : ""}
        onClick={(e) => e.target === e.currentTarget && setIsTerminalOpen(false)}
      >
        <div id="term-win">
          <div id="term-header">
            <div className="t-dot r"></div>
            <div className="t-dot y"></div>
            <div className="t-dot g"></div>
            <span style={{ marginLeft: "auto", color: "var(--t3)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              RISHIT_TERMINAL_V1
            </span>
          </div>
          <div id="term-body">
            {termOutput}
            <div id="term-input-line">
              <span id="term-prompt">rishit@portfolio:~$</span>
              <input
                id="term-input"
                ref={termInputRef}
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={handleTerminalSubmit}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
