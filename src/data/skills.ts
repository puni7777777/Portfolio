import type { Skill } from './types'

export const skills: Skill[] = [
  {
    category: 'CAD/Modeling',
    items: ['SolidWorks', 'AutoCAD', 'CATIA V5', 'Siemens NX']
  },
  {
    category: 'Design Skills',
    items: ['3D Modeling', 'Assembly Design', 'GD&T', 'Sheet Metal', 'Welding']
  },
  {
    category: 'Analysis & Simulation',
    items: ['SolidWorks Simulation', 'ANSYS (Basic)']
  },
  {
    category: 'Tools',
    items: ['MS Office Suite', 'ERP Systems (SAP)']
  }
] as const

