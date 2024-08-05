import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Sound-Responsive Digital Art",
    description: "An interactive digital art piece that creates mesmerizing visualizations in response to sound input.",
    color: "#FF6B6B",
    link: "/sound-responsive-art"
  },
  {
    title: "3D Space Explorer",
    description: "Navigate through a procedurally generated universe, discovering and interacting with unique celestial bodies.",
    color: "#4ECDC4",
    link: "/3d-space-explorer"
  },
  {
    title: "Symbiosis: The Living Canvas",
    description: "An evolving ecosystem simulation that combines artificial life, user interaction, and mesmerizing visuals.",
    color: "#45B7D1",
    link: "/symbiosis-living-canvas"
  }
];

const ProjectCard = ({ project, isSelected }) => (
  <motion.div
    className={`bg-white rounded-lg p-6 shadow-lg ${isSelected ? 'border-4 border-blue-500' : ''}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ backgroundColor: project.color }}
  >
    <h2 className="text-2xl font-bold mb-2 text-white">{project.title}</h2>
    <p className="text-gray-100 mb-4">{project.description}</p>
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-100"
    >
      Explore <ExternalLink className="ml-2" size={18} />
    </a>
  </motion.div>
);

const AmazingPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setSelectedProject((prev) => (prev + 1) % projects.length);
      } else if (event.key === 'ArrowLeft') {
        setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col justify-center items-center p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Amazing Interactive Portfolio
      </motion.h1>

      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard project={projects[selectedProject]} isSelected={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length)}
          className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => setSelectedProject((prev) => (prev + 1) % projects.length)}
          className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <motion.p 
        className="text-white mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Use arrow keys or buttons to navigate between projects
      </motion.p>
    </div>
  );
};

export default AmazingPortfolio;
