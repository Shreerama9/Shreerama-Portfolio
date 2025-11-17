import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Code, Brain, Sparkles, Search, Cpu, GraduationCap, Box, Trophy, HeartPlus } from 'lucide-react';
import { motion } from "framer-motion";
import { profExpData } from "../assets/assets";
import { educationData } from "../assets/assets";

const TimelineTest = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const iconComponents = {
    Brain,
    Sparkles,
    Code,
    Briefcase,
    Trophy,
    Box,
    HeartPlus,
    Cpu
  };

  const filteredExpData = profExpData.filter(exp => {
    const matchesSearch = searchTerm === '' ||
      exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase())) ||
      exp.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <motion.div 
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1 }} 
    transition={{ duration: 1 }}
    id="experience" className='w-full px-[12%] py-10 scroll-mt-20'>

      <motion.h2 
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className='text-center text-5xl font-Ovo'>
      My Experience</motion.h2>

      <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
      
      I build from atoms to algorithms — leading product development in hardware, robotics, and full-stack AI systems that merge deep tech with real-world impact.</motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={`mb-10 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`relative flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg px-3 py-2 w-full md:w-auto`}>
            <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`ml-2 bg-transparent border-none focus:outline-none text-sm w-full ${
                isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`ml-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        ref={containerRef} className="relative py-8">
          <div className={`absolute top-[32px] h-[calc(100%-96px)] w-5 rounded-xl bg-gray-300 dark:bg-gray-700 ${isMobile ? 'left-4' : 'left-1/2'} -translate-x-1/2`}></div>

          <div className="relative">
            {filteredExpData.map((exp, index) => {
              const IconComponent = iconComponents[exp.icon];

              return (
                <div
                  key={index}
                  className={`flex items-center w-full mb-8 ${
                    isMobile ? 'justify-start' : (index % 2 === 0 ? 'justify-start' : 'justify-end')
                  }`}
                >
                  <div
                    className={`w-full ${isMobile ? 'ml-12' : 'md:w-5/12'} ${
                      isMobile ? '' : (index % 2 === 0 ? 'md:pr-8 pr-0' : 'md:pl-8 pl-0')
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className={`border rounded-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                        isDarkMode
                          ? 'border-gray-800 hover:border-purple-500/30 bg-gray-900/50'
                          : 'border-gray-200 hover:border-indigo-500/30 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/20' : 'bg-indigo-100'}`}>
                          {IconComponent && <IconComponent className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`} />}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                          <p className={`text-sm font-semibold ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}>{exp.company}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{exp.tenure}</p>
                        </div>
                      </div>

                      <div className="mb-4 text-left">
                        <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {exp.highlights.slice(0, 2).map((highlight, i) => (
                             <li key={i} className="flex items-start">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1 mr-2 flex-shrink-0 ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-500'}`}></span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`flex flex-wrap gap-1.5 text-left`}>
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-md text-[10px] border ${isDarkMode ? 'text-gray-300 bg-purple-900/10 border-purple-800/30' : 'text-gray-600 bg-indigo-50 border-indigo-200'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>


        </motion.div>

        <motion.div className="flex justify-center mt-2">
  <div className={`w-full md:w-3/4 lg:w-3/4 border rounded-lg p-6 hover:shadow-xl transition-all duration-300 ${
    isDarkMode 
      ? 'border-gray-800 hover:border-purple-500/30 bg-gray-900/50' 
      : 'border-gray-200 hover:border-indigo-500/30 bg-white'
  }`}>
    <div className="flex items-start gap-4 mb-4">
      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/20' : 'bg-indigo-100'}`}>
        <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
      </div>
      <div className="flex-1 text-center">
        <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {educationData[0].degree}
        </h3>
        <p className={`text-lg font-semibold ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}>
          {educationData[0].institution}
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
          {educationData[0].tenure}
        </p>
      </div>
    </div>

    <div className="mb-6">
      <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {educationData[0].highlights.map((highlight, i) => (
          <li key={i} className="flex items-start">
            <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-500'}`}></span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  </div>
</motion.div>
    </motion.div>
  );
};

export default TimelineTest;
