# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 personal portfolio website using the App Router with React 19 and Tailwind CSS 4.

### Page Structure

Single-page layout in `app/page.tsx`:
- `Navbar` - Sticky navigation
- `Hero` - Profile banner with newsletter signup
- `SectionGrid` - Expandable content cards (Work, Content, Interests, Library)
- `SocialsSection` - Social links
- `Footer`

### Component Patterns

**Expandable Section System** (`app/components/SectionGrid.tsx`):
- Uses `WobbleCard` for interactive gradient cards with 3D hover effects
- Each section (Work, Content, Interests, Library) has a paired content component
- State managed via `useState<SectionId>` for accordion behavior

**UI Components** (`app/components/ui/`):
- `wobble-card.tsx` - 3D tilt effect card with gradient backgrounds
- `resizable-navbar.tsx` - Responsive navigation (also duplicated at root `components/ui/`)

### Styling

- Global styles in `app/globals.css` using CSS custom properties
- Uses `clsx` + `tailwind-merge` via `cn()` utility in `lib/utils.ts`
- Shadcn UI configured with Aceternity registry (`components.json`)
- Motion library for animations

### Key Dependencies

- `motion` - Animation library
- `@tabler/icons-react` - Icon set
- `clsx` / `tailwind-merge` - Class utilities
