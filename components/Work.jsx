import { assets, workData } from "../assets/assets";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Cpu, Globe, ArrowRight } from "lucide-react";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Work = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Stage 1: Tilt (0% to 20% of scroll)
  // Stage 2: Horizontal Scroll (20% to 95% of scroll)
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1.05, 1]);
  
  // Keep the header fixed while tilting and during most of the horizontal scroll
  const translate = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  
  // Horizontal scroll of projects inside the container - extended to 95%
  const horizontalX = useTransform(scrollYProgress, [0.2, 0.95], ["0%", "-85%"]);

  return (
    <div id="work" className="bg-transparent" ref={containerRef}>
      <div className="h-[600vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center pt-20 md:pt-28 overflow-hidden">
          
          <div className="w-full relative" style={{ perspective: "1000px" }}>
            {/* Header section inside the scroll flow */}
            <motion.div
              style={{ translateY: translate, opacity }}
              className="max-w-6xl mx-auto text-center mb-10 md:mb-12 px-4"
            >
              <h1 className="flex flex-col gap-2 md:gap-4 font-Outfit text-center tracking-tighter">
                 <span className="text-3xl md:text-5xl font-bold text-black dark:text-white leading-none">
                    Building the Future with
                 </span>
                 <span className="text-5xl md:text-[110px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 leading-none pb-4">
                    Agentic Intelligence
                 </span>
              </h1>
            </motion.div>

            {/* The "Tab" / Container */}
            <motion.div
              style={{
                rotateX,
                scale,
                boxShadow:
                  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
              }}
              className="max-w-6xl mx-auto h-[50vh] md:h-[70vh] w-[95vw] border-[6px] border-[#E6D8DE] p-2 md:p-6 bg-[#222222] rounded-[40px] shadow-2xl overflow-hidden relative"
            >
               {/* Inner Project Track */}
               <div className="h-full w-full bg-gray-100 dark:bg-zinc-900 rounded-3xl overflow-hidden relative flex items-center">
                  <motion.div 
                    style={{ x: horizontalX }} 
                    className="flex gap-8 px-10 items-center h-full"
                  >
                    {workData.map((project, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="group relative h-[80%] w-[350px] md:w-[450px] flex-shrink-0 bg-white dark:bg-zinc-800 rounded-[30px] shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-700 p-8 flex flex-col justify-between"
                      >
                        <div className="absolute top-0 right-0 w-2/3 h-full opacity-5 group-hover:opacity-10 transition-opacity">
                           <Image 
                             src={project.bgImage} 
                             alt="" 
                             layout="fill" 
                             objectFit="cover" 
                             className="grayscale group-hover:grayscale-0 transition-all duration-700"
                           />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                {project.title}
                              </h3>
                              <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors">
                                <ArrowRight size={18} className="group-hover:text-white dark:group-hover:text-black transition-colors" />
                              </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                              {project.techStack?.slice(0, 2).map((tech, i) => (
                                <span key={i} className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 bg-gray-50 dark:bg-zinc-900 text-gray-400 rounded-lg border border-gray-100 dark:border-zinc-700">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-medium text-gray-300 dark:text-zinc-600">
                              0{index + 1}
                            </span>
                          </div>
                        </div>

                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="absolute inset-0 z-20"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative "Personality" Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-Outfit">
              Impactful Innovation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mb-8">
              Shipping products is about solving real problems. From semiconductor handling to assistive healthcare, my work is driven by curiosity and a commitment to engineering excellence.
            </p>
            <div className="flex gap-4">
               {[
                 { label: "Systems Built", value: "12+", icon: <Cpu className="text-blue-500" /> },
                 { label: "Patents Filed", value: "2", icon: <Globe className="text-purple-500" /> }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col items-center min-w-[120px]">
                   {stat.icon}
                   <span className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</span>
                   <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <a 
                href="#contact" 
                className="relative px-10 py-5 bg-white dark:bg-zinc-900 rounded-full leading-none flex items-center gap-3"
              >
                <span className="text-gray-900 dark:text-white font-bold text-lg">Join Me</span>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </a>
            </motion.div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center md:text-right flex items-center gap-2">
              <Users size={14} /> Available for new collaborations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
