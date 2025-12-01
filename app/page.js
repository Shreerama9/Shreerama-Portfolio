'use client'
import { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TimelineTest from "../components/TimelineTest";
import Work from "../components/Work";
import Chatbot from "../components/Chatbot";

export default function Home() {

 const [isDarkMode, setIsDarkMode] = useState(false);
 const [isChatbotOpen, setIsChatbotOpen] = useState(false);

 useEffect(()=>{
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setIsDarkMode(true)
  }else{
    setIsDarkMode(false)
  }
 },[])


 useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }else{
      document.documentElement.classList.remove('dark');
      localStorage.theme = '';  
    }
 },[isDarkMode])

 useEffect(() => {
  const asciiArt = `
                                                    
  ███████╗███████╗ ██████╗██████╗ ███████╗████████╗
  ██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝╚══██╔══╝
  ███████╗█████╗  ██║     ██████╔╝█████╗     ██║   
  ╚════██║██╔══╝  ██║     ██╔══██╗██╔══╝     ██║   
  ███████║███████╗╚██████╗██║  ██║███████╗   ██║   
  ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
                                                   
  Welcome to My Portfolio!!!!               
  `;
  
  console.log(`%c${asciiArt}`, 'color: #4F46E5; font-weight: bold;');
}, []);


  return (
    <>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      {/* Main Navigation */}
      <header>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBookCallClick={() => {
            window.open('https://calendly.com/srama9/20min', '_blank');
          }}
        />
      </header>
      
      {/* Main Content */}
      <main id="main-content" className="min-h-screen">
        <section aria-labelledby="hero-heading">
          <Header isDarkMode={isDarkMode} />
        </section>
        
        <section aria-labelledby="about-heading" id="about">
          <About isDarkMode={isDarkMode} />
        </section>
        
        <section aria-labelledby="experience-heading" id="experience">
          <TimelineTest isDarkMode={isDarkMode} />
        </section>
        
        <section aria-labelledby="projects-heading" id="projects">
          <Work isDarkMode={isDarkMode} />
        </section>
        
        <section aria-labelledby="contact-heading" id="contact">
          <Contact isDarkMode={isDarkMode} />
        </section>
      </main>
      
      {/* Footer */}
      <footer role="contentinfo">
        <Footer isDarkMode={isDarkMode} />
      </footer>
      
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className={`fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isChatbotOpen}
        aria-controls="chatbot-container"
      >
        {isChatbotOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chatbot Component */}
      <div id="chatbot-container" role="complementary" aria-label="AI Assistant Chatbot">
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </>
  );
}
