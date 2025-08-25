import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import WhyPartner from '../components/Home/WhyPartner'
import HowItWorks from '../components/Home/HowWorks'
import Testimonal from '../components/Home/Testimonal'
import FAQ from '../components/Home/FAQ'
// import TransFormPractice from '../components/Home/TransFormPractice'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlobalVision from '../components/Home/GlobalVision'
import ForUsers from '../components/Home/ForUsers'
import ForAdvocates from '../components/Home/ForAdvocates'
import ComplianceAndLegal from '../components/Home/ComplianceAndLegal'

const Home = () => {
  return (
    <>
    <Header />
      <HeroSection />
      <WhyPartner />
      <HowItWorks />
      <GlobalVision />
      <ForUsers />
      <ForAdvocates />
      <Testimonal />
      <FAQ />
      {/* <TransFormPractice /> */}
      <ComplianceAndLegal />
    <Footer />
    </>
  )
}

export default Home
