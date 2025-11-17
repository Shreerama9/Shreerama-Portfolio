import { assets, workData } from "../assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Work = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My latest work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        Explore my latest full-stack AI creations — where web engineering meets
        intelligence. From dynamic frontends to scalable backends, every project
        here reflects my mission to build smarter, faster, and more intuitive
        digital systems that think alongside their users.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 gap-6 dark:text-black"
      >
        {workData.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="opacity-70 aspect-[4/3] sm:aspect-square bg-no-repeat bg-cover bg-center rounded-xl relative cursor-pointer group overflow-hidden"
            style={{ backgroundImage: `url(${project.bgImage.src})` }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                dark:from-white/40 dark:via-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="bg-white/95 dark:bg-gray-900/95 w-11/12 rounded-lg absolute bottom-4 left-1/2 -translate-x-1/2 p-4 flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white line-clamp-1">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {project.category}
                </span>
                <div className="border rounded-full border-black dark:border-white w-8 h-8 flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] group-hover:bg-lime-300 dark:group-hover:bg-lime-600 transition">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={
                        isDarkMode ? assets.send_icon_dark : assets.send_icon
                      }
                      alt="Send icon"
                      className="w-4"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Work;
