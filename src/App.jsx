import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AIDetector from './components/AIDetector';
import FraudMap from './components/FraudMap';
import VerificationFlow from './components/VerificationFlow';
import Footer from './components/Footer';
import ReportModal from './components/ReportModal';
import './App.css';

function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenReport={() => setIsReportModalOpen(true)} />
      <main>
        <Hero onOpenReport={() => setIsReportModalOpen(true)} />
        <AIDetector />
        <FraudMap />
        <Features />
        <VerificationFlow />
      </main>
      <Footer />
      {isReportModalOpen && <ReportModal onClose={() => setIsReportModalOpen(false)} />}
    </>
  );
}

export default App;
