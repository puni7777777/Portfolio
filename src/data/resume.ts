export const resume = {
  name: 'AVULA PUNITH KUMAR REDDY' as const,
  phone: '+91-93908 82204' as const,
  email: 'punithkumar1732003@gmail.com' as const,
  github: 'https://github.com/puni7777777' as const,
  
  title: 'Trainee Engineer -- Mechanical Systems' as const,
  subtitle: 'Liquid Cooling Systems • Thermal Management • System Integration & Commissioning' as const,

  summary: `Trainee Engineer with nearly 2 years of hands-on experience at Bharat Electronics Limited in the engineering, testing, integration, commissioning, and maintenance of production-grade liquid cooling systems for mission-critical applications. Experienced with PLC-operated demineralized-water cooling units designed to maintain tight temperature tolerances and ensure uniform fluid flow across multi-channel distribution networks. Experienced across both standalone vapor-compression refrigeration circuits (R134a) and centralized chilled-water systems utilizing plate heat exchangers. Responsible for vendor technical discussions, drawing reviews, inspections, performance testing, installation supervision, shipboard integration, commissioning, troubleshooting, maintenance, and system modifications. Proficient in SolidWorks, AutoCAD, GD&T, and DFM, with practical exposure to thermal management, automated cooling systems, equipment reliability, and critical infrastructure.` as const,
  
  skills: [
    'Chilled Water Systems',
    'Vapor-Compression Refrigeration (R134a)',
    'Plate Heat Exchangers (PHE)',
    'Demineralized (DM) Water Systems',
    'Hydronic Flow Balancing',
    'PLC-Operated Cooling Systems',
    'Automatic Temperature Control',
    'Shipboard Integration & Commissioning',
    'Equipment Installation & Supervision',
    'Functional & Performance Testing',
    'Root-Cause Troubleshooting',
    'Preventive Maintenance',
    'SolidWorks',
    'AutoCAD',
    'CATIA V5',
    '3D Modeling & Assembly Design',
    'GD&T',
    'DFM Principles',
    'Sheet Metal & Welding',
    'SolidWorks Simulation',
    'ANSYS (Basic)',
    'Vendor Drawing Review & Inspection',
    'ERP Systems (SAP)',
    'MS Office Suite',
    'Next.js & React.js',
    'TypeScript & Tailwind CSS'
  ] as const,
  
  experience: [
    {
      company: 'Bharat Electronics Limited',
      location: 'Hyderabad, Telangana',
      role: 'Trainee Engineer -- Mechanical Systems',
      period: 'Feb 2025 – Present',
      achievements: [
        'Managed production-grade, mission-critical shipboard cooling systems circulating demineralized (DM) water to cool high-power defense electronic payloads under stringent operating conditions.',
        'Operated and evaluated dual cooling architectures: a standalone vapor-compression refrigeration system (R134a) maintaining strict coolant temperature limits, and a centralized chilled-water circuit coupled with plate heat exchangers (PHE) to eliminate separate compressor loops.',
        'Executed precision hydronic balancing across multi-channel cooling networks using supply headers and calibrated needle valves, ensuring uniform flow distribution and optimal pressure balance.',
        'Monitored and maintained PLC-automated closed-loop control systems integrating plate heat exchangers, solenoid valves, flow control valves, and circulation pumps for automated thermal stability.',
        'Led vendor technical discussions, reviewed engineering fabrication drawings, conducted factory acceptance inspections, and contributed to component selection and cooling system modifications.',
        'Supervised equipment installation, performed functional/performance testing, and executed shipboard integration and commissioning in coordination with naval and shipyard personnel.',
        'Conducted rapid root-cause troubleshooting, preventive maintenance, and mechanical drawing updates in SolidWorks and AutoCAD adhering to GD&T and DFM standards.'
      ]
    }
  ] as const,
  
  education: [
    {
      school: 'JNTUH UNIVERSITY COLLEGE OF ENGINEERING SULTANPUR',
      location: 'Sangareddy, Telangana',
      degree: 'Bachelor of Technology in Mechanical Engineering',
      gpa: '6.9/10.0',
      year: '2024'
    },
    {
      school: 'Sri Chaitanya Jr kalashala',
      location: 'Hyderabad, Telangana',
      degree: 'Intermediate',
      percentage: '91.4%',
      year: '2018 - 2020'
    },
    {
      school: 'Unique High School',
      location: 'Hyderabad, Telangana',
      degree: '10th Class',
      gpa: '9.7/10.0',
      year: '2018'
    }
  ] as const,
  
  projects: [
    {
      title: 'Bladeless Fan using Ion Wind',
      tech: 'SolidWorks, Electrohydrodynamics, FDM 3D Printing',
      description: [
        'Designed, analyzed, and built an experimental bladeless airflow system harnessing corona discharge ionization to produce non-mechanical fluid propulsion.',
        'Engineered precision 3D CAD assemblies of electrode arrays in SolidWorks, analyzing structural tolerances to maintain uniform electrostatic field distribution.',
        'Executed systematic experimental trials to map the voltage-to-airflow output curve, optimizing operating electrical parameters for maximum aerodynamic efficiency.',
        'Fabricated a modular enclosure utilizing FDM 3D printing, integrating high-voltage step-up circuitry with dedicated electrical insulation to eliminate arcing and ensure operational safety.'
      ]
    },
    {
      title: 'Automated PET Filament Extruder & Spooling System',
      tech: 'Thermal Pultrusion, Arduino, SolidWorks, Motor Driver',
      description: [
        'Designed and built an automated recycling system to convert waste PET plastic bottles into continuous, usable 3D printing filament using a custom thermal pultrusion mechanism.',
        'Engineered a precision bottle-stripping cutter and a motorized, gear-driven spooling mechanism to maintain steady pulling tension and ensure uniform filament winding.',
        'Implemented closed-loop temperature regulation using an Arduino and thermistor-coupled heating block, maintaining optimal melting temperature to achieve consistent filament diameter and prevent thermal degradation.',
        'Integrated an Arduino and dedicated motor driver to modulate pulling speed and torque, synchronizing extrusion rate with spool rotation to eliminate filament thinning and breakage.'
      ]
    }
  ] as const
} as const
