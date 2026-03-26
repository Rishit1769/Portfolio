# Portfolio Website

A modern, animation-rich personal portfolio built with Next.js App Router and TypeScript.

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
- Custom cursor system (dot + ring) with hover states
- Scroll-driven reveal animations via IntersectionObserver
- Mouse-reactive global grid and spotlight effects
- Canvas-based aurora background animation
- Scramble and typewriter text micro-interactions
- Interactive tracking bot element

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
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