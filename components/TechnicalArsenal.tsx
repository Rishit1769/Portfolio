"use client";
import React, { useEffect, useRef } from "react";

const arsenal = [
  {
    title: "LANGUAGES",
    items: ["Python", "C", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Bash"],
  },
  {
    title: "FRAMEWORKS & LIBRARIES",
    items: ["Next.js", "React", "Node.js", "Express.js", "Tailwind CSS"],
  },
  {
    title: "BACKEND & DATABASES",
    items: ["MySQL", "Redis", "Firebase"],
  },
  {
    title: "CLOUD & INFRASTRUCTURE",
    items: ["AWS S3", "AWS EC2", "AWS IAM", "Nginx", "Docker", "Linux Server Admin"],
  },
  {
    title: "AUTH & SECURITY",
    items: ["JWT", "NextAuth", "bcrypt", "OTP Flows", "RBAC", "Middleware Route Protection", "HTTPS/CORS"],
  },
  {
    title: "TOOLS & PRACTICES",
    items: ["Git", "GitHub", "VS Code", "REST API Design", "DB Outbox Pattern", "SSR/SSG/ISR"],
  },
  {
    title: "APIS & INTEGRATIONS",
    items: ["Google Gemini API", "Nodemailer", "PDFKit", "Leaflet"],
  },
];

const TechnicalArsenal = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("active"); }),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".rv").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="arsenal-wrap" ref={wrapRef}>
      <span className="s-num rv">02 — SKILLS</span>
      <h2 className="s-title rv">
        The <em>Arsenal</em>
      </h2>

      <div className="arsenal-grid">
        {arsenal.map((section, i) => (
          <div
            key={section.title}
            className="arsenal-card rv spotlight-card"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="arsenal-card-head">
              <span className="arsenal-title">{section.title}</span>
            </div>
            <div className="arsenal-items">
              {section.items.map((item) => (
                <span key={item} className="sc-item">{item}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Always Learning card */}
        <div
          className="arsenal-card arsenal-learning-card rv spotlight-card"
          style={{ transitionDelay: `${7 * 60}ms` }}
        >
          <div className="arsenal-learning-inner">
            <div className="arsenal-learning-pulse">
              <span className="arsenal-learning-dot"></span>
              <span className="arsenal-learning-label">Status</span>
            </div>
            <p className="arsenal-learning-heading">Always<br /><em>Learning</em></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TechnicalArsenal;
