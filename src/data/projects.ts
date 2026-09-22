import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'bladeless-fan',
    title: "Bladeless Fan using Ion Wind",
    description: "Designed, analyzed, and built an experimental bladeless airflow system harnessing corona discharge ionization to produce non-mechanical fluid propulsion. Engineered precision 3D CAD assemblies of electrode arrays in SolidWorks, analyzing structural tolerances to maintain uniform electrostatic field distribution. Fabricated an FDM 3D-printed enclosure with high-voltage step-up circuitry.",
    link: "",
    category: "Mechanical",
    modelUrl: "/models/bladeless-fan.stl",
    models: [
      { name: "Bladeless Fan (3D Mesh .STL)", url: "/models/bladeless-fan.stl" },
      // { name: "Bladeless Fan (Native STEP Assembly .step)", url: "/models/bladeless-fan.step" },
      // { name: "Sample AutoCAD Drawing (2D/3D .dxf)", url: "/models/sample-drawing.dxf" },
    ],
    tech: ["SolidWorks", "ANSYS", "CAD", "Prototyping", "High Voltage"],
    designProcess: [
      "Electrode array geometry optimization & tolerance analysis",
      "High voltage corona discharge & electrostatic field modeling",
      "Flow field simulation and CFD analysis in ANSYS",
      "Modular enclosure fabrication using FDM 3D printing",
      "Voltage-to-airflow performance curve mapping & optimization"
    ],
    software: ["SolidWorks", "ANSYS Fluent", "MATLAB"],
    specs: [
      { label: "Voltage", value: "12kV" },
      { label: "Electrode Gap", value: "2.5 mm" },
      { label: "Material", value: "3D printed PLA" },
      { label: "Power", value: "25 W" }
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
    id: 'pet-filament-extruder',
    title: "Automated PET Filament Extruder & Spooling System",
    description: "Designed and built an automated recycling system to convert waste PET plastic bottles into continuous, usable 3D printing filament using a custom thermal pultrusion mechanism. Engineered bottle-stripping cutter, gear-driven spooler, closed-loop Arduino temperature regulation, and synchronized motor torque modulation.",
    link: "",
    category: "Mechanical",
    tech: ["SolidWorks", "Arduino", "Thermal Pultrusion", "Motor Controls", "Recycling Tech"],
    designProcess: [
      "Thermal pultrusion nozzle & mechanism design in SolidWorks",
      "Precision bottle-stripping cutter engineering",
      "Motorized, gear-driven spooling & tensioning mechanism",
      "Closed-loop PID temperature regulation via Arduino & thermistor",
      "Extrusion rate and spooling torque synchronization calibration"
    ],
    software: ["SolidWorks", "Arduino IDE", "KiCAD"],
    specs: [
      { label: "Input Material", value: "Waste PET Bottles" },
      { label: "Filament Output", value: "1.75 mm" },
      { label: "Temperature Control", value: "Arduino PID Closed-Loop" },
      { label: "Spooling", value: "Gear-Driven Motorized" }
    ],
    performance: [
      { label: "Diameter Consistency", value: "±0.05", unit: "mm" },
      { label: "Extrusion Temp", value: "220", unit: "°C" },
      { label: "Recycling Yield", value: "85", unit: "%" },
      { label: "Spooling Speed", value: "12", unit: "rpm" }
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
