import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, X, Volume2, Pause } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

import data from '../data/KolkataData.json';

// --- LEAFLET IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// ----- INTERFACES -----
interface Story {
  id: number;
  title: string;
  excerpt: string;
  fullStory: string;
  imageUrl: string;
  era: string;
}

interface Festival {
  name: string;
  month: string;
  description: string;
  imageUrl: string;
  color: string;
}

interface HeritageLocation {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  category: string;
}

interface HistoryPageProps {
  onBack: () => void;
}

// ----- IMPORTING JSON DATA -----
const stories: Story[] = data.stories;
const festivals: Festival[] = data.festivals;
const heritageLocations: HeritageLocation[] = data.heritageLocations;

export function HistoryPage({ onBack }: HistoryPageProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [hoveredFestival, setHoveredFestival] = useState<Festival | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);

  const narrateStory = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isNarrating) {
        window.speechSynthesis.cancel();
        setIsNarrating(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsNarrating(false);
        window.speechSynthesis.speak(utterance);
        setIsNarrating(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>

          <h1 className="text-5xl text-gray-900 mb-2">Kolkata Through Time</h1>
          <p className="text-xl text-gray-600">Stories and memories that define the soul of the City of Joy</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Stories Section */}
        <section>
          <h2 className="text-3xl text-gray-900 mb-8">Nostalgic Stories of Kolkata</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map(story => (
              <Card
                key={story.id}
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                onClick={() => setSelectedStory(story)}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">{story.era}</Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{story.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{story.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section>
          <h2 className="text-3xl text-gray-900 mb-8">Explore Kolkata - Heritage Locations</h2>

          <Card className="overflow-hidden border-2 border-amber-200 shadow-xl">
            <CardContent className="p-0">
              <div className="h-[600px] w-full relative">
                <MapContainer center={[22.5726, 88.3639]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {heritageLocations.map(location => (
                    <Marker key={location.id} position={[location.lat, location.lng]}>
                      <Popup>
                        <div className="w-64">
                          <div className="h-32 w-full overflow-hidden rounded-md mb-2">
                            <img src={location.imageUrl} className="w-full h-full object-cover" alt={location.name} />
                          </div>

                          <h3 className="font-bold text-lg text-amber-900">{location.name}</h3>
                          <Badge variant="secondary" className="mb-1 text-xs">{location.category}</Badge>
                          <p className="text-xs text-gray-600">{location.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Festival Section */}
        <section>
          <h2 className="text-3xl text-gray-900 mb-8">Festival Timeline of West Bengal</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-red-500 to-blue-500 hidden md:block" />

            <div className="space-y-8">
              {festivals.map((festival, index) => (
                <div
                  key={festival.name}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}
                  onMouseEnter={() => setHoveredFestival(festival)}
                  onMouseLeave={() => setHoveredFestival(null)}
                >
                  {/* Card */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback src={festival.imageUrl} alt={festival.name} className="w-full h-full object-cover" />
                        <div className={`absolute top-0 right-0 ${festival.color} text-white px-4 py-2 text-sm`}>
                          {festival.month}
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-2xl text-gray-900 mb-2">{festival.name}</h3>
                        {hoveredFestival?.name === festival.name ? (
                          <p className="text-gray-600 text-sm">{festival.description}</p>
                        ) : (
                          <p className="text-gray-400 text-sm italic">Hover to learn more</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block relative z-10">
                    <div className={`w-6 h-6 rounded-full ${festival.color} border-4 border-white shadow-lg`} />
                  </div>

                  <div className="md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Full Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-lg max-w-4xl w-full shadow-2xl">
              
              {/* Image Header */}
              <div className="relative h-96 overflow-hidden rounded-t-lg">
                <ImageWithFallback src={selectedStory.imageUrl} alt={selectedStory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/90" onClick={() => setSelectedStory(null)}>
                  <X className="w-6 h-6" />
                </Button>

                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-white/90 text-gray-800">{selectedStory.era}</Badge>
                  <h2 className="text-4xl text-white">{selectedStory.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <Button onClick={() => narrateStory(selectedStory.fullStory)} variant="outline" className="flex items-center gap-2 mb-6">
                  {isNarrating ? (<><Pause className="w-5 h-5" /> Stop Narration</>) : (<><Volume2 className="w-5 h-5" /> Listen to Story</>)}
                </Button>

                <div className="prose prose-lg">
                  {selectedStory.fullStory.split('\n\n').map((p, i) => (
                    <p key={i} className="text-gray-700">{p}</p>
                  ))}
                </div>

                <Button
                  className="mt-6"
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsNarrating(false);
                    setSelectedStory(null);
                  }}
                >
                  Close Story
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}
