import { Suspense } from 'react'
import HomePage from './components/home-page'
import Opening from '@/components/opening'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <section className="bg-black">
      <Suspense fallback={<Opening />}>
        <HomePage />
      </Suspense>
    </section>
  )
}
