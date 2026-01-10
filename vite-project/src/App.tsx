import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { ArtGallery } from './components/ArtGallery';
import { LanguagePage } from './components/LanguagePage';
import { HistoryPage } from './components/HistoryPage';
import { motion } from 'motion/react';
import { Palette, BookOpen, Languages, Menu, X } from 'lucide-react';
import { GeminiChat } from './components/GeminiChat'; // ✅ Imported here

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Sub-Pages ---
  // If you want the Chatbot on these pages too, you can add <GeminiChat /> next to them!
  // Example: return <><ArtGallery ... /> <GeminiChat /></>;

  if (currentPage === 'art') {
    return <ArtGallery onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'language') {
    return <LanguagePage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'history') {
    return <HistoryPage onBack={() => setCurrentPage('home')} />;
  }

  // --- Home Page ---
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1677307816181-1446ab18913e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3dyYWglMjBicmlkZ2UlMjBrb2xrYXRhfGVufDF8fHx8MTc2NDY2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Howrah Bridge"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <div className="text-white">
              <div className="text-xl">Kolkata Heritage</div>
              <div className="text-xs text-gray-300">Digital Archive</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => setCurrentPage('art')}
            >
              <Palette className="w-4 h-4 mr-2" />
              Art
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => setCurrentPage('history')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => setCurrentPage('language')}
            >
              <Languages className="w-4 h-4 mr-2" />
              Language
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md"
          >
            <nav className="px-4 py-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/20"
                onClick={() => {
                  setCurrentPage('art');
                  setMenuOpen(false);
                }}
              >
                <Palette className="w-4 h-4 mr-2" />
                Art Gallery
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/20"
                onClick={() => {
                  setCurrentPage('history');
                  setMenuOpen(false);
                }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/20"
                onClick={() => {
                  setCurrentPage('language');
                  setMenuOpen(false);
                }}
              >
                <Languages className="w-4 h-4 mr-2" />
                Language
              </Button>
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white">
        <div className="max-w-4xl text-center space-y-8">
          {/* Tagline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white"
          >
            Preserving Kolkata's Soul Through Digital Art & Stories
          </motion.h1>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg min-w-[200px] shadow-xl hover:shadow-2xl transition-shadow duration-300"
                onClick={() => setCurrentPage('art')}
              >
                <Palette className="w-5 h-5 mr-2" />
                Explore Art
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg min-w-[200px] shadow-xl hover:shadow-2xl transition-shadow duration-300"
                onClick={() => setCurrentPage('history')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore History
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg min-w-[200px] shadow-xl hover:shadow-2xl transition-shadow duration-300"
                onClick={() => setCurrentPage('language')}
              >
                <Languages className="w-5 h-5 mr-2" />
                Explore Language
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ✅ ADDED GEMINI CHAT HERE */}
      <GeminiChat />
      
    </div>
  );
}