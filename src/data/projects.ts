import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'bladeless-fan',
    title: "Bladeless Fan using Ion Wind",
    description: "B.Tech Major Project | Designed and prototyped a bladeless fan utilizing Ion Wind (Ion thrust) to generate airflow through high-voltage corona discharge. Optimized electrode geometries in SolidWorks and performed experimental analysis.",
    link: "",
    category: "Mechanical",
    tech: ["SolidWorks", "ANSYS", "CAD", "Prototyping"],
    designProcess: [
      "Electrode geometry optimization",
      "High voltage corona discharge analysis",
      "Flow field simulation in ANSYS",
      "Prototype fabrication and testing",
      "Performance optimization iteration"
    ],
    software: ["SolidWorks", "ANSYS Fluent", "MATLAB"],
    specs: [
      { label: "Voltage", value: "12kV" },
      { label: "Electrode Gap", value: "2.5" },
      { label: "Material", value: "3D printed PLA" },
      { label: "Power", value: "25" }
    ],
    performance: [
      { label: "Max Airflow", value: "3.2", unit: "m/s" },
      { label: "Flow Rate", value: "0.8", unit: "m³/min" },
      { label: "Efficiency", value: "82", unit: "%" },
      { label: "Noise Level", value: "28", unit: "dB" },
      { label: "Power Draw", value: "25", unit: "W" }
    ]
  },
  {
    id: 'arrora',
    title: "Arrora E-commerce",
    description: "Modern e-commerce platform for natural foods built with responsive design and performant architecture.",
    link: "https://github.com/puni7777777/arrorra",
    category: "Software",
    tech: ["Next.js", "Tailwind", "TypeScript", "React"],
    performance: [
      { label: "Page Load", value: "1.1", unit: "s" },
      { label: "LCP", value: "0.8", unit: "s" },
      { label: "CLS", value: "0.02", unit: "" },
      { label: "FCP", value: "0.9", unit: "s" },
      { label: "TTI", value: "1.4", unit: "s" }
    ]
  },
  {
    id: 'dsa-tracker',
    title: "DSA Tracker",
    description: "Personalized DSA preparation progress tracker with localStorage persistence and categorized questions.",
    link: "https://github.com/puni7777777/Dsa-Tracker",
    category: "Software",
    tech: ["React", "localStorage", "TypeScript"]
  },
  {
    id: 'text-handle-v1-1',
    title: "Text Handle v1.1",
    description: "Advanced text manipulation tool with case conversion, line numbering, and find/replace functionality.",
    link: "https://github.com/puni7777777/TextHandle_1.1",
    category: "Software",
    tech: ["Next.js", "React Hooks"]
  },
  {
    id: 'arrora-next14',
    title: "Arrora Next.js 14",
    description: "High-performance e-commerce rebuilt in Next.js 14 App Router with optimized SEO and loading.",
    link: "https://github.com/puni7777777/arrorra_nxtjs14",
    category: "Software",
    tech: ["Next.js 14", "App Router", "RSC"]
  },
  {
    id: 'login-component',
    title: "Secure Login Component",
    description: "Reusable, accessible login component for Next.js applications with form validation and security.",
    link: "https://github.com/puni7777777/loginComponent",
    category: "Software",
    tech: ["React", "Zod", "Tailwind"]
  },
  {
    id: 'punith-tools',
    title: "Punith Tools Collection",
    description: "Suite of productivity tools for developers and engineers with batch processing capabilities.",
    link: "https://github.com/puni7777777/Punith",
    category: "Software",
    tech: ["Next.js", "TypeScript", "File API"]
  }
]
