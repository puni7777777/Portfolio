export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  category: 'CAD' | 'Design' | 'Engineering' | 'Manufacturing';
  content: string;
}

export const blogPosts = [
  {
    slug: 'ion-wind-technology',
    title: 'The Future of Ion Wind Technology in Cooling Systems',
    date: '2024-10-01',
    excerpt: 'Exploring ion wind as a silent, vibration-free alternative to traditional fans in electronics cooling. CAD simulations and prototype results.',
    readingTime: 8,
    category: 'Engineering',
    content: "## Introduction to Ion Wind\\nIon wind, also known as electrohydrodynamic (EHD) flow, uses corona discharge to create ionized air flow without moving parts. This technology offers significant advantages over mechanical fans.\\n\\n### Key Advantages\\n- **Silent Operation**: No moving parts = no noise\\n- **Vibration Free**: Ideal for precision instruments\\n- **Dust Resistant**: No blades to clog\\n- **Low Power**: Efficient for small devices\\n\\n## CAD Modeling Process\\nUsing SolidWorks, I modeled a prototype ion wind generator:\\n\\n**Parameters:**\\n- Electrode Gap: 2mm\\n- Voltage: 12kV DC\\n- Flow Rate: 0.5 m³/min\\n- Dimensions: 50x50x10mm\\n\\n## Simulation Results (ANSYS)\\n- Velocity Profile: Peak 3 m/s\\n- Temperature Drop: 15°C on CPU\\n- Efficiency: 80% vs fan\\n\\n## Challenges & Solutions\\n**Challenge**: Ozone generation\\n**Solution**: Optimized electrode geometry\\n\\nThis technology represents the future of thermal management in compact electronics.",
  },
  {
    slug: 'designing-for-dfm',
    title: 'Designing for Manufacturability (DFM) - CAD Best Practices',
    date: '2024-09-25',
    excerpt: 'Practical DFM principles for mechanical design using AutoCAD and SolidWorks. Reduce costs and improve quality from the first prototype.',
    readingTime: 6,
    category: 'Design',
    content: "## DFM Fundamentals\\nDesign for Manufacturability focuses on designing parts that are easy to produce.\\n\\n### Core Principles\\n1. **Minimize Part Count** - Assembly efficiency\\n2. **Standard Features** - Use off-the-shelf components\\n3. **Symmetry** - Equal draft angles\\n4. **Generous Tolerances** - ±0.1mm where possible\\n\\n## CAD Implementation\\n### SolidWorks 3D DFM Checklist\\n- Draft Analysis Tool\\n- Thickness Analysis\\n- Undercut Detection\\n- Cost Estimation\\n\\n## Case Study: CNC Bracket\\n**Before DFM**: 4 setups, $25/part\\n**After DFM**: 2 setups, $12/part\\n**Savings**: 52% cost reduction\\n\\nDFM thinking from day 1 saves time and money.",
  },
  {
    slug: 'cad-parametric-modeling',
    title: 'Mastering Parametric Modeling in CAD - Design Automation',
    date: '2024-09-15',
    excerpt: 'Leverage parametric design in CATIA and NX UG to create fully automated, fully configurable mechanical assemblies.',
    readingTime: 7,
    category: 'CAD',
    content: "## What is Parametric Modeling?\\n\\nParametric modeling uses constraints and relationships to create intelligent designs that automatically update when dimensions change.\\n\\n## CATIA Parametric Workflow\\n1. Sketch → Relations → Dimensions\\n2. Pattern Features → Driven Dimensions\\n3. Assembly Constraints → Behavioral Modeling\\n4. Knowledgeware → Design Tables\\n\\n## NX UG Advanced Features\\n- **Expression Driven**: All dimensions formula-based\\n- **User Defined Features (UDF)**: Reusable parametric blocks\\n- **Part Families**: 1000+ variants from 1 master\\n\\n## Real-World Example: Gearbox Assembly\\n**PARAMETERS:**\\n- Gear Ratio: 3.5:1 → 14 gears auto-generated\\n- Module: 2mm → All teeth auto-sized\\n- Shaft Diameter: 25mm → All bores updated\\n- Center Distance: Auto-calculated\\n\\n**Result**: Single parameter change → complete assembly updated in 2 seconds.\\n\\nParametric modeling = **10x productivity boost**.",
  }
] as const;

export type BlogPostSlug = (typeof blogPosts)[number]['slug'];

