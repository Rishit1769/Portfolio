"use client";

import React from "react";

const arsenal = [
  {
    title: "LANGUAGES",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M7 17V7h2v8h4v2H7z" fill="#fff"/></svg>`,
    items: ["Python", "C", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Bash"],
  },
  {
    title: "FRAMEWORKS & LIBRARIES",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M6 17V7h12v10H6zm2-8v6h8V9H8z" fill="#fff"/></svg>`,
    items: ["Next.js", "React", "Node.js", "Express.js", "Tailwind CSS"],
  },
  {
    title: "BACKEND & DATABASES",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M7 17V7h10v10H7zm2-8v6h6V9H9z" fill="#fff"/></svg>`,
    items: ["MySQL", "Redis", "Firebase"],
  },
  {
    title: "CLOUD & INFRASTRUCTURE",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M8 16h8v-2H8v2zm0-4h8v-2H8v2zm0-4h8V6H8v2z" fill="#fff"/></svg>`,
    items: ["AWS S3", "AWS EC2", "AWS IAM", "Nginx", "Docker", "Linux Server Admin"],
  },
  {
    title: "AUTH & SECURITY",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M12 17a5 5 0 100-10 5 5 0 000 10z" fill="#fff"/></svg>`,
    items: ["JWT", "NextAuth", "bcrypt", "OTP Flows", "RBAC", "Middleware Route Protection", "HTTPS/CORS"],
  },
  {
    title: "TOOLS & PRACTICES",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M8 16h8v-2H8v2zm0-4h8v-2H8v2zm0-4h8V6H8v2z" fill="#fff"/></svg>`,
    items: ["Git", "GitHub", "Postman", "VS Code", "REST API Design", "DB Outbox Pattern", "SSR/SSG/ISR"],
  },
  {
    title: "APIS & INTEGRATIONS",
    icon: `<svg width="24" height="24" fill="none"><rect width="24" height="24" rx="4" fill="#000"/><path d="M12 17a5 5 0 100-10 5 5 0 000 10z" fill="#fff"/></svg>`,
    items: ["Google Gemini API", "Nodemailer", "PDFKit"],
  },
];

const TechnicalArsenal = () => {
  return (
    <div className="arsenal-wrap">
      <div className="arsenal-grid">
        {arsenal.map((section) => (
          <div key={section.title} className="arsenal-card spotlight-card">
            <div className="arsenal-card-head">
              <span
                dangerouslySetInnerHTML={{ __html: section.icon }}
                className="arsenal-icon"
              />
              <span className="arsenal-title">{section.title}</span>
            </div>
            <div className="arsenal-items">
              {section.items.map((item) => (
                <span key={item} className="sc-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Always-learning card */}
        <div className="arsenal-card arsenal-learning-card">
          <div className="arsenal-learning-inner">
            <div className="arsenal-learning-pulse">
              <span className="arsenal-learning-dot" />
            </div>
            <p className="arsenal-learning-label">ALWAYS EVOLVING</p>
            <h3 className="arsenal-learning-heading">
              Adding new<br /><em>skills</em> every day
            </h3>
            <p className="arsenal-learning-sub">
              Constantly exploring new technologies, frameworks, and paradigms to stay sharp at the cutting edge.
            </p>
            <div className="arsenal-learning-tags">
              {["AI / ML", "Rust", "WebAssembly", "gRPC", "K8s"].map((t) => (
                <span key={t} className="arsenal-learning-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalArsenal;
