import type { Skill } from './types'

export const skills: Skill[] = [
  {
    category: 'Cooling & Thermal Systems',
    items: [
      'Chilled Water Systems',
      'Vapor-Compression Refrigeration (R134a)',
      'Plate Heat Exchangers (PHE)',
      'Demineralized (DM) Water Loops',
      'Hydronic Flow Balancing'
    ]
  },
  {
    category: 'System Integration & Commissioning',
    items: [
      'Equipment Installation',
      'Shipboard Integration',
      'Functional Testing',
      'Performance Testing',
      'Commissioning',
      'Troubleshooting',
      'Preventive Maintenance'
    ]
  },
  {
    category: 'Automation & Controls',
    items: [
      'PLC-Operated Cooling Systems',
      'Automatic Temperature Control',
      'Flow Control Systems',
      'System Monitoring & Interlocks'
    ]
  },
  {
    category: 'Mechanical Design',
    items: [
      '3D Modeling',
      'Assembly Design',
      'GD&T',
      'DFM Principles',
      'Sheet Metal Design',
      'Welding',
      'Engineering Drawing Review'
    ]
  },
  {
    category: 'CAD/Modeling',
    items: ['SolidWorks', 'AutoCAD', 'CATIA V5']
  },
  {
    category: 'Analysis & Simulation',
    items: ['SolidWorks Simulation', 'ANSYS (Basic)']
  },
  {
    category: 'Engineering & Vendor Management',
    items: [
      'Vendor Technical Discussions',
      'Vendor Drawing Review',
      'Vendor Inspection',
      'Technical Coordination',
      'System Modifications & Improvements'
    ]
  },
  {
    category: 'Tools & Enterprise Systems',
    items: ['SAP ERP', 'MS Office Suite', 'Git & GitHub', 'Next.js & React']
  }
] as const
