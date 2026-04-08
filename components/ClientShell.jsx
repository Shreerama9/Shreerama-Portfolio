'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import TimelineTest from "./TimelineTest";
import Work from "./Work";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ClientShell() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

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
    console.log(`%c${asciiArt}`, "color: #4F46E5; font-weight: bold;");
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <header>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBookCallClick={() => {
            window.open("https://calendly.com/srama9/20min", "_blank");
          }}
        />
      </header>

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

      <footer role="contentinfo">
        <Footer isDarkMode={isDarkMode} />
      </footer>

      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className={`fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          isDarkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isChatbotOpen}
        aria-controls="chatbot-container"
      >
        {isChatbotOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      <div
        id="chatbot-container"
        role="complementary"
        aria-label="AI Assistant Chatbot"
      >
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </>
  );
}
