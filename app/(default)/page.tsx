export const metadata = {
  title: 'Fundraising School - Be a great deal for investors and raise money like a pro',
  description: 'Fuel your LATAM startup at Fundraising School. Master fundraising with expert-led courses on pitch decks and venture capital. Join to accelerate growth, achieve goals, and network with founders. Unleash fundraising expertise for success!',
}

import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import Tutors from '@/components/tutors'
import Moderators from '@/components/moderators'
import Questions from '@/components/questions'

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Tutors />
      <Moderators />
      {/* <Features /> */}
      {/* <FeaturesBlocks /> */}
      {/* <Newsletter /> */}
      <Questions />
    </>
  )
}