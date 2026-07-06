export interface GalleryItem {
  id: string;
  title: string;
  category: 'CAD' | '3D Modeling' | 'Analysis' | 'Certification';
  image: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'autocad-drawing',
    title: 'AutoCAD Technical Drawing',
    category: 'CAD',
    image: '/gallery/autocad-drawing.jpg',
    description: 'Precision engineering drawing with GD&T specifications'
  },
  {
    id: 'solidworks-assembly',
    title: 'SolidWorks Assembly',
    category: '3D Modeling',
    image: '/gallery/solidworks-assembly.jpg',
    description: 'Multi-part mechanical assembly with exploded view'
  },
  {
    id: 'ansys-simulation',
    title: 'ANSYS FEA Simulation',
    category: 'Analysis',
    image: '/gallery/ansys-simulation.jpg',
    description: 'Stress analysis and deformation results'
  },
  {
    id: 'catia-sheetmetal',
    title: 'CATIA Sheet Metal Design',
    category: 'CAD',
    image: '/gallery/catia-sheetmetal.jpg',
    description: 'Complex sheet metal component with bend tables'
  },
  {
    id: 'certificate-autocad',
    title: 'AutoCAD Certification',
    category: 'Certification',
    image: '/gallery/certificate-autocad.jpg',
    description: 'Autodesk Certified Professional'
  },
  {
    id: 'nx-ug-model',
    title: 'NX UG Parametric Model',
    category: '3D Modeling',
    image: '/gallery/nx-ug-model.jpg',
    description: 'Parametric feature-based modeling'
  },
  {
    id: 'gdandt-drawing',
    title: 'GD&T Engineering Drawing',
    category: 'CAD',
    image: '/gallery/gdandt-drawing.jpg',
    description: 'Geometric Dimensioning and Tolerancing'
  },
  {
    id: 'solidworks-simulation',
    title: 'SolidWorks Simulation',
    category: 'Analysis',
    image: '/gallery/solidworks-simulation.jpg',
    description: 'Thermal and structural analysis results'
  }
]

