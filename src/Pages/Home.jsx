import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import WhyPartner from '../components/Home/WhyPartner'
import HowItWorks from '../components/Home/HowWorks'
import Testimonal from '../components/Home/Testimonal'
import FAQ from '../components/Home/FAQ'
import TransFormPractice from '../components/Home/TransFormPractice'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Header />
      <HeroSection />
      <WhyPartner />
      <HowItWorks />
      <Testimonal />
      <FAQ />
      <TransFormPractice />
    <Footer />
    </>
  )
}

export default Home
