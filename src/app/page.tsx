import { Suspense } from 'react'
import HomePage from './components/home-page'
import Opening from '@/components/opening'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: {
    post: string
  }
}

export default async function Home({ searchParams }: Props) {
  const query = searchParams.post || ''
  return (
    <section className="bg-black">
      <Suspense fallback={<Opening />}>
        <HomePage query={query} />
      </Suspense>
    </section>
  )
}
