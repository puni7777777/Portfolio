# Interactive Engineering & Software Portfolio

A premium, modern portfolio website built using **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS 4**, and **Framer Motion 12**. This portfolio showcases the projects, experience, and tools of **Avula Punith Kumar Reddy**, a Mechanical Design Engineer at Bharat Electronics Limited (BEL).

---

## 🚀 Key Features

*   **Interactive 3D CAD Viewer**: Powered by `@react-three/fiber` and `@react-three/drei` to render `.stl`, `.obj`, and `.glb` files directly in the browser with interactive pan, zoom, and orbit controls.
*   **Dual Portfolio Pages**: Distinct showcases for both **Mechanical Engineering** designs (featuring CAD modeling, assembly calculations, and fluid simulations) and **Software Development** projects.
*   **Dynamic Resume & Timelines**: High-performance interactive timelines rendering professional experience, achievements, and academic history.
*   **Built-in Utility Tools Suite**:
    *   **Mechanical Unit Converter**: Custom converter for essential engineering units (Pressure: `psi ⇄ MPa`, Torque: `lb-ft ⇄ Nm`, Stress: `psi ⇄ MPa`, Flow Rate: `GPM ⇄ l/min`).
    *   **TextHandle Pro**: Advanced utility for string manipulation featuring case toggle, line numbering, find-and-replace, and numerical-to-word conversions.
    *   **Typing Mastery**: A beautiful, responsive speed-typing testing ground that tracks accuracy, WPM, and saves high scores locally.
    *   **Batch File Uploader**: Multi-file uploading utility with live progress tracking.
*   **Premium Aesthetics**: Curated color palettes, glassmorphism design accents, and smooth micro-animations.

---

## 🛠️ Technology Stack

*   **Core**: [Next.js 15.5](https://nextjs.org/) (App Router, React Server Components) & [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
*   **Animation**: [Framer Motion 12](https://www.framer.com/motion/)
*   **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Directory Structure

```text
portfolio/
├── src/
│   ├── app/                 # Next.js pages and API route handlers
│   │   ├── about/           # Profile page with interactive timeline
│   │   ├── batchupload/     # Multi-file uploading interface
│   │   ├── blog/            # Dynamic engineering & dev articles
│   │   ├── gallery/         # Certifications and project gallery
│   │   ├── resume/          # Professional CV layout
│   │   ├── texthandle/      # Text formatting utility page
│   │   ├── typing/          # Interactive typing speed arena
│   │   └── utilities/       # Math/Engineering converter utility
│   ├── components/          # Reusable React components (Header, Footer, ThreeHero)
│   │   └── ui/              # Atom components (Button, Card)
│   ├── data/                # Data layers (experience, projects, skills, biography)
│   └── lib/                 # Utility helpers (clsx, tailwind-merge)
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/puni7777777/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```
