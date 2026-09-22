---
name: Punith Portfolio
description: The Mission Control Blueprint design system for defense-grade mechanical systems, thermal management, and precision CAD visualization
colors:
  primary: "#06b6d4"
  primary-hover: "#0891b2"
  secondary: "#a855f7"
  secondary-hover: "#9333ea"
  accent-emerald: "#10b981"
  neutral-bg: "#0a0a0a"
  neutral-surface: "#121215"
  neutral-surface-hover: "#18181d"
  neutral-border: "#27272a"
  text-primary: "#ffffff"
  text-secondary: "#d4d4d8"
  text-muted: "#a1a1aa"
typography:
  display:
    fontFamily: "var(--font-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "var(--font-sans), Arial, Helvetica, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-sans), Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  telemetry:
    fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.secondary-hover}"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-cad-action:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  card-base:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge-telemetry:
    backgroundColor: "rgba(6, 182, 212, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  section-heading:
    fontFamily: "var(--font-sans)"
    fontWeight: 900
    marginBottom: "{spacing.lg}"
---

# Design System: Punith Portfolio

## Overview

**Creative North Star: "The Mission Control Blueprint"**

The visual language balances the mathematical rigor of mechanical engineering documentation with the luminescent clarity of an aerospace mission control terminal. Deep obsidian and charcoal canvas surfaces are layered with glassmorphic depth, punctuated by crisp vector linework, telemetry indicators, and localized neon glows that illuminate interactive states without distracting from the underlying CAD models.

The tone is authoritative, technical, and restrained. Avoid generic SaaS cartoon illustrations, flat corporate light-gray containers, and frivolous bouncy animations. Interactive elements communicate weight and mechanical precision through deliberate transitions, subtle border luminescences, and monospace telemetry readouts.

**Key Characteristics:**
- **Obsidian Glass Foundations**: Dark, multi-layered translucent surfaces with backdrop blurs (`backdrop-blur-xl`) maintaining high contrast against technical schematics.
- **Domain-Driven Chromatics**: Avionics Cyan signals mechanical hardware, thermal systems, and CAD geometry; Deep Plasma Purple identifies software engineering, portfolio metadata, and personal brand.
- **Restrained Telemetry Typography**: Monospace font stacks for engineering specifications, CAD dimensions, and system status indicators, grounded by clean structural sans-serif headings.
- **Precision CAD HUDs**: Floating translucent viewports with integrated AutoCAD ViewCube orientation, layer management sidebars, and real-time viewport controls.

## Colors

The palette derives from physical telemetry terminals and technical drafting blueprints: deep ambient shadows, luminescent status indicators, and stark monochromatic contrast.

### Primary
- **Avionics Cyan** (`#06b6d4` / `rgb(6, 182, 212)`): The signature color of mechanical engineering, liquid cooling circuits, 3D CAD mesh highlights, and technical action buttons. Used for active CAD modes, dimension callouts, and mechanical project badges.

### Secondary
- **Deep Plasma Purple** (`#a855f7` / `rgb(168, 85, 247)`): The signature color of software engineering, timeline nodes, primary navigation glows, and overarching portfolio identity accents.

### Tertiary
- **Telemetry Emerald** (`#10b981` / `rgb(16, 185, 129)`): Used for success indicators, active status readouts, verified checks, and high-efficiency performance metrics.

### Neutral
- **Obsidian Deep** (`#0a0a0a`): The default canvas background that minimizes eye fatigue and provides maximum contrast for emissive glows.
- **Console Surface** (`#121215` / `#18181d`): Elevated glassmorphic surfaces for cards, HUD dialogs, and viewport control toolbars.
- **Technical Border** (`#27272a` / `rgba(255, 255, 255, 0.1)`): Crisp 1px structural dividing lines defining panels and viewport frames.
- **Signal White** (`#ffffff`): High-priority headings, primary action labels, and active typography.
- **Muted Steel** (`#d4d4d8` / `#a1a1aa`): Secondary technical documentation, specs labels, and supporting copy.

### Named Rules
**The Domain Spectrum Rule.** Never mix Cyan and Purple arbitrarily within the same component hierarchy. Mechanical systems, liquid cooling, and CAD geometry strictly use Avionics Cyan; personal identity, timeline milestones, and software tools utilize Plasma Purple.
**The Ambient Rim Rule.** Glows and shadows must never be opaque fills. They exist as diffuse, low-opacity ambient halos (`rgba(6, 182, 212, 0.15)` to `rgba(168, 85, 247, 0.2)`) that activate primarily on hover or focus to signal responsiveness.

## Typography

**Display Font:** Geist Sans (`var(--font-sans)`, system-ui, sans-serif)  
**Body Font:** Geist Sans (`var(--font-sans)`, system-ui, sans-serif)  
**Label/Mono Font:** Geist Mono (`var(--font-mono)`, ui-monospace, monospace)  

**Character:** Bold, unadorned structural headings paired with crisp, high-legibility body prose and dense monospace telemetry for engineering data points.

### Hierarchy
- **Display** (Bold 800, `clamp(2rem, 5vw, 4.5rem)`, line-height 1.1): Hero greetings and major page titles, rendered with gradient clip fills.
- **Headline** (Bold 700, `clamp(1.5rem, 3vw, 2.5rem)`, line-height 1.2): Section titles ("Experience", "Skills & Technologies", "Engineering Projects").
- **Title** (Semi-Bold 600, `1.25rem` / 20px, line-height 1.4): Card titles, project names, and organization roles.
- **Body** (Regular 400-500, `1rem` / 16px, line-height 1.6): Narrative prose, bullet points, and project descriptions; constrained to max line length 75ch.
- **Label** (Medium-Bold 600, `0.75rem` / 12px, letter-spacing 0.05em, uppercase): Technical specifications, unit badges, and timestamp tags.
- **Telemetry Micro** (Semi-Bold 600, `0.625rem` / 10px, letter-spacing 0.08em, uppercase): 3D viewport orientation controls (ViewCube), coordinate axes, CAD layer badges, and compact metric indicators.

### Named Rules
**The Telemetry Mono Rule.** All numerical quantities, dimensional tolerances (e.g. `±0.05 mm`), CAD coordinates, electrical values (`12kV`), and status codes must be set in monospace typography.

## Layout

The spatial model uses an 8px base rhythm with fluid container constraints (`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`). Responsive adaptations scale seamlessly from 375px mobile touchscreens up to 4K desktop workstations:
- **Mobile (< 640px)**: Single-column stacked cards, collapsed navigation drawer with animated accordion menus, adaptive 3D viewport height (`h-[420px]`), and scaled-down HUD controls (`scale-75 origin-top-right`).
- **Tablet (640px – 1024px)**: 2-column balanced grids for technical specs, timelines, and project cards.
- **Desktop (> 1024px)**: 3-column project showcases, wide 3D CAD inspection viewports (`h-[650px]`), and side-by-side engineering telemetry layouts.

## Elevation & Depth

Surfaces do not rely on skeuomorphic dropshadows or heavy bevels. Depth is generated through **tonal glass layering** (`glass-strong` with backdrop-filter blur) and **chromatic ambient lighting**:
- Resting surfaces sit flat at `z-index: 10` with dark translucent backgrounds (`rgba(18, 18, 21, 0.8)`).
- Hover states lift elements subtly (`transform: translateY(-2px)`) and project a soft neon rim glow (`box-shadow: 0 0 25px rgba(6, 182, 212, 0.2)` or `0 0 25px rgba(168, 85, 247, 0.2)`).
- Floating HUDs (ViewCube, layer manager) cast deep ambient shadows (`0 20px 25px -5px rgba(0, 0, 0, 0.8)`) to establish visual separation above the 3D WebGL canvas.

### Shadow Vocabulary
- **cad-ambient-cyan** (`box-shadow: 0 0 20px rgba(6, 182, 212, 0.2)`): Highlights active mechanical cards, 3D viewport containers, and CAD action buttons.
- **cad-ambient-purple** (`box-shadow: 0 0 20px rgba(168, 85, 247, 0.2)`): Highlights software cards, resume achievements, and primary CTAs.
- **viewport-elevation** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7)`): Structural foundation grounding 3D CAD canvases.

### Named Rules
**The Flat-By-Default Rule.** All surfaces rest without harsh directional drop shadows. Shadows appear as radiant glows only in response to state changes (hover, focus, or active selection).

## Shapes

- **Card Containers**: Rounded 16px (`rounded-2xl`) with 1px border stroke (`border border-white/10` or `border border-zinc-800`).
- **Interactive Controls & Buttons**: Rounded 8px to 12px (`rounded-lg` / `rounded-xl`) maintaining comfortable touch target dimensions (minimum 44px on mobile).
- **Status & Tech Chips**: Rounded full pill geometry (`rounded-full`) with subtle 1px border halos.
- **Laser Divider**: Signature horizontal hairline divider (2px height) with dual-direction gradient glow animation separating the header and footer from content.

## Components

### Buttons
- **Shape**: Rounded 8px to 12px (`rounded-lg` / `rounded-xl`).
- **Primary / Default**: Gradient fill from `purple-600` to `purple-700` with subtle white border overlay; hover transitions to `purple-500` with radiant glow.
- **Glass**: Translucent background (`rgba(255, 255, 255, 0.05)`), backdrop blur (`backdrop-blur-xl`), and crisp underline offset; hover applies cyan or purple fill.
- **Outline**: High-contrast 2px border in cyan or purple; hover fills subtle dark tint and radiates a soft glow.
- **CAD Toolbar Action**: Dark compact capsule (`px-2.5 py-1 text-[11px] font-mono`) with active mode toggling between dark slate and solid cyan.

### Cards / Containers
- **Corner Style**: 16px radius (`rounded-2xl`).
- **Background**: Translucent charcoal (`bg-zinc-950/80` or `glass-strong`).
- **Border**: 1px subtle stroke (`border border-white/10` or `border border-cyan-500/20`).
- **Internal Padding**: Fluid `p-6 md:p-8`.

### Telemetry Badge (`<Badge>`)
- **Variants**: `cyan` (mechanical/thermal), `purple` (software/identity), `emerald` (status/verified), `neutral`.
- **Geometry**: Compact monospace pills (`rounded`, `font-mono`) or category badges (`rounded-full`).
- **Styling**: Translucent tinted background with 1px border stroke and optional ambient rim glow (`glow`).

### Section Heading (`<SectionHeading>`)
- **Structure**: High-contrast gradient display title with built-in descender clearance (`pb-2 sm:pb-3 leading-tight`), responsive scale (`text-3xl sm:text-5xl lg:text-6xl`), and optional constrained subtitle (`max-w-3xl mx-auto`).
- **Transitions**: Calibrated Framer Motion entry with opacity and subtle upward translation.

### CAD Viewport & Floating HUDs
- **ViewCube Widget**: Floating top-right AutoCAD-style 3D orientation cube with orthographic camera snapping (`TOP`, `FRONT`, `RIGHT`, `LEFT`, `BACK`, `ISO`) and responsive scale adaptation (`scale-75 sm:scale-100`).
- **Layer Control Sidebar**: Floating translucent panel listing AutoCAD DXF layers with color-coded swatches and interactive visibility toggles (`ON` / `OFF`).
- **Telemetry Readout Bar**: Floating bottom-left guide displaying context-aware navigation tips (mouse drag instructions on desktop; 1-finger drag and pinch gestures on mobile).

### Navigation Header
- **Style**: Sticky top bar with 90% opacity black glass (`bg-black/90 backdrop-blur-xl`), animated dual laser glow dividers, desktop link items with center-expanding hover underlines, and mobile slide-down drawer with nested accordion.

## Do's and Don'ts

### Do:
- **Do** maintain strict separation between Mechanical/CAD accents (Avionics Cyan `#06b6d4`) and Software/Identity accents (Plasma Purple `#a855f7`).
- **Do** format all engineering tolerances, coordinates, voltages, and CAD statistics in monospace typography (`font-mono`).
- **Do** ensure every interactive element meets the 44px touch target minimum on mobile viewports.
- **Do** use `backdrop-blur-xl` on translucent containers to maintain high contrast and legibility over canvas backgrounds.
- **Do** preserve 1-to-1 camera synchronization on the ViewCube so that viewport rotation faithfully mirrors user gestures.

### Don't:
- **Don't** use light or white theme backgrounds; the portfolio identity is strictly dark blueprint and mission control telemetry.
- **Don't** introduce generic SaaS illustrations, bubbly pastel icons, or non-technical decorative graphics.
- **Don't** use jarring high-frequency bounce or spring animations; motion must feel damped, calibrated, and engineering-grade.
- **Don't** allow CAD model canvases to exceed viewport heights on mobile portrait screens.
- **Don't** use hardcoded raw pixel widths that break mobile responsiveness on 375px screens.
