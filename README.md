# Portfolio — Abdullah Ali

Personal portfolio website for **Abdullah Ali**, AI/ML Engineer. A single-page
Next.js app with a dark/light theme, an animated neural background, and
in-app previews for the resume, project deep-dives, and certifications.

## Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [React 18](https://react.dev) + TypeScript
- [Tailwind CSS 3](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [lucide-react](https://lucide.dev) for icons
- `clsx` + `tailwind-merge` for class composition

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run typecheck  # tsc --noEmit
```

## Project structure

```
app/
  layout.tsx        root layout, fonts, metadata
  page.tsx          page composition + modal state
  globals.css       design tokens, shared component classes
components/
  canvas/           animated background layers
  modals/           resume, certificate, and project-detail modals
  sections/         one component per page section
  ui/               navbar, footer, theme toggle
data/
  portfolio-data.ts single source of truth for all portfolio content
lib/
  utils.ts          `cn()` class-name helper
public/
  abdullahimage.jpeg        profile photo
  Abdullah_resume_AI_ENG.pdf  resume (embedded preview + download)
  certificates/              certificate files shown in the preview modal
```

All editable content — personal info, projects, experience, skills,
certifications — lives in `data/portfolio-data.ts`. Editing that file is
enough to change what the site displays.

## Adding a certificate

1. Drop the file into `public/certificates/`.
2. Add an entry to `CERTIFICATIONS` in `data/portfolio-data.ts`:

```ts
{
  id: "my-course",
  title: "My Course",
  issuer: "Provider · Instructor",
  issued: "Jan 1, 2026",
  credential: "10 hours",
  file: "/certificates/my-course.pdf",
  media: "pdf", // or "image"
}
```

Certificates with `media: "pdf"` render in an embedded viewer; `image`
files render as a scrollable, zoom-free preview. Both are downloadable.

## Deployment

Deploys as a standard Next.js app — Vercel, or any Node host:

```bash
npm run build && npm run start
```

No environment variables are required.

## Contact

- GitHub — https://github.com/MAbdullah005
- LinkedIn — https://www.linkedin.com/in/abdullah-ali-584186301/
- Email — abdullahaliofc@gmail.com
