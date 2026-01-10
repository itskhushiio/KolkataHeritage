import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, ArrowLeft, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import data from '../data/KolkataData.json';

interface ArtItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year?: string;
  artist?: string;
}

const artItems: ArtItem[] = data.artItems;

const categories = ['All', 'Terracotta', 'Alpana', 'Old Photos', 'Calligraphy'];

interface ArtGalleryProps {
  onBack: () => void;
}

export function ArtGallery({ onBack }: ArtGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [lightboxItem, setLightboxItem] = useState<ArtItem | null>(null);

  const filteredItems = artItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
          
          <h1 className="text-5xl text-gray-900 mb-6">
            Kolkata Art Gallery
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Art Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <div className="aspect-square">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hover Popup */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/90 p-4 flex flex-col justify-center text-white"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl">
                            {item.title}
                          </h3>
                          <ZoomIn className="w-5 h-5 text-gray-300" />
                        </div>
                        <Badge className="w-fit mb-3" variant="secondary">
                          {item.category}
                        </Badge>
                        <p className="text-sm text-gray-300 mb-3">
                          {item.description}
                        </p>
                        {item.year && (
                          <p className="text-sm text-gray-400">
                            Year: {item.year}
                          </p>
                        )}
                        {item.artist && (
                          <p className="text-sm text-gray-400">
                            Artist: {item.artist}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">Click to view full size</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No artworks found. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setLightboxItem(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative">
                  <ImageWithFallback
                    src={lightboxItem.imageUrl}
                    alt={lightboxItem.title}
                    className="w-full max-h-[70vh] object-contain bg-gray-100"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl text-gray-900 mb-2">
                        {lightboxItem.title}
                      </h2>
                      <Badge variant="secondary">{lightboxItem.category}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {lightboxItem.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    {lightboxItem.year && (
                      <div>
                        <strong>Year:</strong> {lightboxItem.year}
                      </div>
                    )}
                    {lightboxItem.artist && (
                      <div>
                        <strong>Artist:</strong> {lightboxItem.artist}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
