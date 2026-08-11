import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Client3DPage from './Client3DPage'

export async function generateStaticParams() {
  return projects
    .filter((p) => p.category === 'Mechanical')
    .map((project) => ({
      id: project.id,
    }))
}

export default async function Project3DPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return <Client3DPage id={id} />
}
