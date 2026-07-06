export interface Project {
  id: string
  title: string
  description: string
  link: string
  category: "Mechanical" | "Software"
  tech: string[]
  designProcess?: string[]
  software?: string[]
  specs?: { label: string; value: string }[]
  performance?: { label: string; value: string; unit?: string }[]
}



export interface Experience {
  company: string
  location: string
  role: string
  period: string
  achievements: string[]
}

export interface Education {
  school: string
  location: string
  degree: string
  gpa?: string
  percentage?: string
  year: string
}

export interface Skill {
  category: string
  items: string[]
}

