# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are hiring managers, technical recruiters, and engineering directors reviewing job applications. They need to quickly evaluate Punith's technical competence, understand his exact domain expertise in mechanical systems and liquid cooling, review real production experience from Bharat Electronics Limited, and inspect hands-on engineering projects and CAD models in one unified place.

## Product Purpose

A high-performance technical engineering portfolio and interactive showcase for Avula Punith Kumar Reddy. It aggregates verified engineering experience, defense-grade cooling systems work, technical CAD models, interactive 3D/2D CAD viewports, and complete resume data so recruiters can immediately assess qualifications and make hiring decisions.

## Positioning

Anchored in mission-critical defense engineering: nearly 2 years of hands-on experience at Bharat Electronics Limited (BEL) in production-grade liquid cooling systems (chilled water loops, vapor-compression refrigeration, plate heat exchangers, DM water systems, and PLC automated controls) paired with precision CAD modeling (SolidWorks, AutoCAD, GD&T, DFM) and interactive browser-based 3D CAD/DXF engineering visualization.

## Operating Context

Recruiters and hiring leads accessing the portfolio on desktop monitors and mobile devices while reviewing resumes. Often scanning for 30–90 seconds to find key competencies, specific CAD tools, defense/industrial experience, verified achievements, and interactive work proof before scheduling interviews.

## Capabilities and Constraints

- Capabilities:
  - Interactive 3D CAD Viewer rendering native STL, OpenCascade WebAssembly STEP assemblies, and AutoCAD DXF drawings with layer toggle controls.
  - Comprehensive resume view mirroring the official LaTeX resume (`resume_final.tex`) with direct PDF download.
  - Filterable mechanical and software engineering project showcases with detailed design processes, specs, and performance metrics.
  - Responsive mobile and desktop glassmorphic interface with fluid typography and dark mode blueprint styling.
- Technical Constraints:
  - Next.js static export (`output: 'export'`) deployed on Vercel.
  - Zero-backend client-side WebAssembly execution for CAD tessellation (OpenCascade WASM, DXF parsing).
  - Production build must maintain clean SSG across all dynamic project routes.

## Brand Commitments

- Name: Avula Punith Kumar Reddy (PUNITH).
- Identity: Precision Mechanical Systems & Thermal Management Engineer.
- Aesthetic: Technical engineering blueprint meets modern dark glassmorphism (cyan/purple neon accents, monospace telemetry typography, dark obsidian backdrops).

## Evidence on Hand

- Verified production work history at Bharat Electronics Limited (BEL), Hyderabad.
- Compiled resume PDF (`public/resume.pdf` derived from `src/data/resume/resume_final.tex`).
- Real 3D CAD assets: Bladeless Fan 3D mesh (`bladeless-fan.stl`), native assembly (`bladeless-fan.step`), and AutoCAD drawing (`sample-drawing.dxf`).
- Verified academic record from JNTUH College of Engineering Sultanpur (B.Tech Mechanical Engineering, 2024).

## Product Principles

1. **Recruiter-First Scanability**: Critical credentials—BEL liquid cooling experience, CAD proficiencies, contact links, and downloadable PDF resume—must be discoverable within 5 seconds.
2. **Artifact-Led Proof**: Let real engineering artifacts (interactive 3D models, CAD drawings, technical specs, and quantifiable metrics) prove capability rather than unsupported claims.
3. **Engineering Rigor Over Fluff**: Maintain technical precision in terminology (GD&T, DFM, PHE, R134a, hydronic balancing, PLC interlocks) reflecting authentic defense-grade engineering.
4. **Instant, Zero-Friction Performance**: Fast static page loads, seamless client-side CAD parsing, and robust mobile responsiveness across every viewport.
