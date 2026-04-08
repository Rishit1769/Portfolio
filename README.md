# Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![ESLint](https://img.shields.io/badge/ESLint-1e1b4b?style=for-the-badge&logo=eslint&logoColor=white)

[![GitHub](https://img.shields.io/badge/GitHub-0f0f0f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rishit1769)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rishit-singh-586742361/)
[![Email](https://img.shields.io/badge/Email-2c2c2c?style=for-the-badge&logo=gmail&logoColor=white)](mailto:singhrishit471@gmail.com)

A modern, animation-rich personal portfolio built with Next.js App Router and TypeScript.

Website Live Link: https://rishit.codes

The project emphasizes motion, atmosphere, and interaction design while still keeping the code modular and maintainable.

## About The Project

This website presents Rishit as a full-stack developer through a single-page, sectioned experience. It combines expressive typography, custom mouse interactions, reveal-on-scroll transitions, and theme-aware visuals to create a distinctive portfolio style.

Core goals:

- Showcase technical depth and product thinking
- Highlight selected projects and experience
- Provide a memorable UI with smooth motion and custom effects
- Keep the codebase component-driven and reusable

## Implemented Sections

The homepage currently includes:

1. Hero section with animated identity treatment
2. About section with philosophy and stat counters
3. Skills section with categorized technology cards
4. Projects section with links and technology tags
5. Experience section
6. Contact section with social links
7. Command-style terminal overlay for quick profile commands

## Key Features

- Theme switching with View Transition animation
- Custom cursor system (dot + ring) with hover states and smooth motion
- Scroll-driven reveal animations via IntersectionObserver
- Mouse-reactive global grid, subtle spotlight effects, and aurora canvas glow
- Scramble and typewriter text micro-interactions
- Interactive tracking bot element

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 (installed; layout is driven by custom CSS)
- ESLint

## Current Folder Structure

```text
app/
  favicon.ico
  globals.css
  layout.tsx
  page.tsx

components/
  AuroraBackground.tsx
  ScrambleText.tsx
  TrackingBot.tsx
  Typewriter.tsx

hooks/
  useMousePosition.ts
  useReveal.ts

public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg

AGENTS.md
CLAUDE.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
tsconfig.json
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open in browser:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - Run development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This app can be deployed on Vercel or any Node.js environment that supports Next.js production builds.
