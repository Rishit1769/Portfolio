"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { ScrambleText } from "../components/ScrambleText";
import { Typewriter } from "../components/Typewriter";
import { TrackingBot } from "../components/TrackingBot";
import { AuroraBackground } from "../components/AuroraBackground";
import TechnicalArsenal from "../components/TechnicalArsenal";

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
              Available: about, work, skills, contact, theme, clear, exit
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
              Projects: LostNFound, Cloud Campus.
            </div>
          );
          break;
        case "skills":
          newOutput.push(
            <div key={Date.now() + 1}>
              The Arsenal: TypeScript, JavaScript, Python (DSA), C, React,
              Next.js, Tailwind CSS, HTML / CSS, Figma, Node.js, Express,
              FastAPI, Django, Flask, JWT, MySQL, Redis, AWS, Docker,
              Kubernetes, CI/CD Pipelines, Arch Linux (Desktop), Fedora Linux
              (Server), Git / GitHub / Gitea.
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
                Command not found: {val}. Type 'help' for list.
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

  return (
    <>
      <div id="loadbar"></div>
      <div id="grain"></div>
      <div id="cd" ref={cursorDotRef}></div>
      <div id="cr" ref={cursorRingRef}></div>
      <AuroraBackground isLight={theme === "light"} />
      <div id="global-grid-interactive"></div>

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
              <a href="#" className="btn-p magnetic hover-btn" download>
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
              With over 3 years of experience in the full-stack landscape, I've developed
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
        <div className="project-list">
          {[{
            num: "01",
            title: "LostNFound",
            desc: "A centralized platform to report, track, and recover lost belongings seamlessly.",
            tags: ["React", "Node.js", "Express", "MySQL", "Docker"],
            links: [
              { name: "GitHub", url: "https://github.com/Rishit1769/LostNFound" },
              { name: "Gitea", url: "https://gitea.rishit.codes/Rishit/LostNFound" },
              { name: "Live ↗", url: "http://lostnfound.rishit.codes/" },
            ],
          }, {
            num: "02",
            title: "Cloud Campus",
            desc: "A comprehensive, role-based educational management system with AI integrations and high-speed caching.",
            tags: ["Next.js", "TypeScript", "Express", "MySQL", "Redis", "AWS S3", "Gemini API", "Docker"],
            links: [
              { name: "GitHub", url: "https://github.com/Rishit1769/CloudCampus" },
              { name: "Gitea", url: "https://gitea.rishit.codes/Rishit/CloudCampus" },
              { name: "Live ↗", url: "#" },
            ],
          }].map((proj, i) => (
            <div key={proj.num} className="project-row rv" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <span className="p-num">{proj.num}</span>
              <span className="p-title">{proj.title}</span>
              <span className="p-desc">{proj.desc}</span>
              <div className="p-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="p-tag">{tag}</span>
                ))}
              </div>
              <div className="p-links">
                {proj.links.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="p-link hover-link">
                    {link.name}
                  </a>
                ))}
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
        </div>
      </section>

      <section id="contact">
        <div className="contact-wrap">
          <span className="s-num rv">05 — CONNECT</span>
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
            <a href="https://gitea.rishit.codes/Rishit" target="_blank" rel="noreferrer" className="hover-link">Gitea</a>
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
