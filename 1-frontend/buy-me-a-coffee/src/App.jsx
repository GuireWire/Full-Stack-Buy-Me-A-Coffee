import Features from './sections/Features.jsx'
import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Pricing from './sections/Pricing.jsx'
import Articles from './sections/Articles.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Footer from './sections/Footer.jsx'

const App = () => {

  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Articles />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default App