import { blogPosts } from '@/data/blog'
import ClientBlogPost from './ClientBlogPost'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <ClientBlogPost slug={slug} />
}

