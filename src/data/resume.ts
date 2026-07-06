export const resume = {
  name: 'AVULA PUNITH KUMAR REDDY' as const,
  phone: '+91-93908 82204' as const,
  email: 'punithkumar1732003@gmail.com' as const,
  github: 'https://github.com/puni7777777' as const,
  
  summary: `Dynamic Mechanical Design Engineer with 1+ years of hands-on experience in CAD modeling, product design, and engineering analysis at Bharat Electronics Limited. Expert in SolidWorks, AutoCAD, and GD&T for developing precision components and assemblies that meet stringent manufacturing standards. Demonstrated success in applying DFM principles to optimize designs, resolve production challenges, and contribute to cost-effective solutions while ensuring compliance and quality excellence.` as const,
  
  skills: [
    'SolidWorks',
    'AutoCAD', 
    'CATIA V5',
    'Siemens NX',
    '3D Modeling',
    'Assembly Design',
    'GD&T',
    'Sheet Metal',
    'Welding',
    'SolidWorks Simulation',
    'ANSYS (Basic)',
    'MS Office Suite',
    'ERP Systems (SAP)'
  ] as const,
  
  experience: [
    {
      company: 'Bharat Electronics Limited',
      location: 'Hyderabad, Telangana',
      role: 'Mechanical Design Engineer',
      period: 'Feb 2025 – Present',
      achievements: [
        'Developed detailed 3D models and 2D manufacturing drawings for mechanical components using SolidWorks and AutoCAD, ensuring 100% compliance with industry standards.',
        'Collaborated with manufacturing team to resolve production bottlenecks.',
        'Applied Geometric Dimensioning and Tolerancing (GD&T) to ensure precision and interchangeability of complex parts.',
        'Maintained BOM for multiple product lines in ERP system.',
        'Conducted static load analysis using SolidWorks Simulation.'
      ]
    }
  ] as const,
  
  education: [
    {
      school: 'JNTUH-UCES',
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
      tech: 'SolidWorks, Electrohydrodynamics',
      description: [
        'Designed and prototyped bladeless fan utilizing Ion Wind (Ion thrust)',
        'Optimized emitter/collector electrode geometries for maximum airflow',
        'Experimental analysis of voltage vs airflow relationship',
        'FDM 3D printed housing (PLA) with high-voltage integration'
      ]
    }
  ] as const
} as const

