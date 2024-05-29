import { getAllPosts } from '@/lib/post'
import PostList from './components/post-list'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <section className="bg-black">
      <PostList posts={posts} />
    </section>
  )
}
