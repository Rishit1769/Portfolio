# Portfolio Website

Personal portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS.

This project is focused on a modern, high-contrast visual style with motion-led interactions such as reveal-on-scroll animations and mouse-reactive effects.

## Website Outline

The website is structured as a single-page portfolio experience with the following sections:

1. Hero
	- Name, role, short value statement, and primary call to action.
2. About
	- Personal introduction, background, and design/development approach.
3. Skills
	- Tech stack, tools, and capability highlights.
4. Projects
	- Selected work with short descriptions, tech used, and links.
5. Experience / Achievements
	- Professional timeline, notable outcomes, and milestones.
6. Contact
	- Clear ways to connect: email, socials, and optional form.

## Current Build Status

- Base Next.js app setup is complete.
- Global design system and animation-related styles are configured in app/globals.css.
- Reusable interaction hooks are available in hooks/useReveal.ts and hooks/useMousePosition.ts.
- Homepage content in app/page.tsx is currently in starter state and can be replaced with the full portfolio sections listed above.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Project Structure

```text
app/
  globals.css        Global styles, theme tokens, motion utilities
  layout.tsx         Root layout and metadata
  page.tsx           Main homepage

hooks/
  useReveal.ts       Scroll-based reveal + stat counter trigger
  useMousePosition.ts Mouse tracking + CSS variable updates

public/              Static assets
```

## Getting Started

1. Install dependencies:

	npm install

2. Start development server:

	npm run dev

3. Open in browser:

	http://localhost:3000

## Available Scripts

- npm run dev: Start local development server
- npm run build: Create production build
- npm run start: Run production server
- npm run lint: Run lint checks

## Deployment

Recommended deployment target: Vercel.

You can also deploy to any platform that supports a Node.js Next.js build output.

## Roadmap

- Replace starter homepage content with final portfolio sections
- Add project cards and case study details
- Connect contact section to a backend service or form provider
- Add SEO metadata for personal branding and social previews