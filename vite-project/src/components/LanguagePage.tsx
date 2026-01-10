import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Play, Search, Volume2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { LanguageQuiz } from './LanguageQuiz';
import { motion } from 'motion/react';

interface BengaliLetter {
  character: string;
  pronunciation: string;
  type: 'vowel' | 'consonant';
}

const bengaliAlphabets: BengaliLetter[] = [
  // Vowels (স্বরবর্ণ)
  { character: 'অ', pronunciation: 'ô', type: 'vowel' },
  { character: 'আ', pronunciation: 'a', type: 'vowel' },
  { character: 'ই', pronunciation: 'i', type: 'vowel' },
  { character: 'ঈ', pronunciation: 'ee', type: 'vowel' },
  { character: 'উ', pronunciation: 'u', type: 'vowel' },
  { character: 'ঊ', pronunciation: 'oo', type: 'vowel' },
  { character: 'ঋ', pronunciation: 'ri', type: 'vowel' },
  { character: 'এ', pronunciation: 'e', type: 'vowel' },
  { character: 'ঐ', pronunciation: 'oi', type: 'vowel' },
  { character: 'ও', pronunciation: 'o', type: 'vowel' },
  { character: 'ঔ', pronunciation: 'ou', type: 'vowel' },
  
  // Consonants (ব্যঞ্জনবর্ণ)
  { character: 'ক', pronunciation: 'kô', type: 'consonant' },
  { character: 'খ', pronunciation: 'khô', type: 'consonant' },
  { character: 'গ', pronunciation: 'gô', type: 'consonant' },
  { character: 'ঘ', pronunciation: 'ghô', type: 'consonant' },
  { character: 'ঙ', pronunciation: 'ngô', type: 'consonant' },
  { character: 'চ', pronunciation: 'chô', type: 'consonant' },
  { character: 'ছ', pronunciation: 'chhô', type: 'consonant' },
  { character: 'জ', pronunciation: 'jô', type: 'consonant' },
  { character: 'ঝ', pronunciation: 'jhô', type: 'consonant' },
  { character: 'ঞ', pronunciation: 'nyô', type: 'consonant' },
  { character: 'ট', pronunciation: 'tô', type: 'consonant' },
  { character: 'ঠ', pronunciation: 'thô', type: 'consonant' },
  { character: 'ড', pronunciation: 'dô', type: 'consonant' },
  { character: 'ঢ', pronunciation: 'dhô', type: 'consonant' },
  { character: 'ণ', pronunciation: 'nô', type: 'consonant' },
  { character: 'ত', pronunciation: 'tô', type: 'consonant' },
  { character: 'থ', pronunciation: 'thô', type: 'consonant' },
  { character: 'দ', pronunciation: 'dô', type: 'consonant' },
  { character: 'ধ', pronunciation: 'dhô', type: 'consonant' },
  { character: 'ন', pronunciation: 'nô', type: 'consonant' },
  { character: 'প', pronunciation: 'pô', type: 'consonant' },
  { character: 'ফ', pronunciation: 'phô', type: 'consonant' },
  { character: 'ব', pronunciation: 'bô', type: 'consonant' },
  { character: 'ভ', pronunciation: 'bhô', type: 'consonant' },
  { character: 'ম', pronunciation: 'mô', type: 'consonant' },
  { character: 'য', pronunciation: 'jô', type: 'consonant' },
  { character: 'র', pronunciation: 'rô', type: 'consonant' },
  { character: 'ল', pronunciation: 'lô', type: 'consonant' },
  { character: 'শ', pronunciation: 'shô', type: 'consonant' },
  { character: 'ষ', pronunciation: 'shô', type: 'consonant' },
  { character: 'স', pronunciation: 'sô', type: 'consonant' },
  { character: 'হ', pronunciation: 'hô', type: 'consonant' },
  { character: 'ড়', pronunciation: 'rô', type: 'consonant' },
  { character: 'ঢ়', pronunciation: 'rhô', type: 'consonant' },
  { character: 'য়', pronunciation: 'yô', type: 'consonant' },
  { character: 'ৎ', pronunciation: 't', type: 'consonant' },
];

interface WordMeaning {
  bengali: string;
  english: string;
  pronunciation: string;
}

const bengaliWords: WordMeaning[] = [
  { bengali: 'নমস্কার', english: 'Hello/Greetings', pronunciation: 'nomoshkar' },
  { bengali: 'ধন্যবাদ', english: 'Thank you', pronunciation: 'dhonnobad' },
  { bengali: 'ভালো', english: 'Good', pronunciation: 'bhalo' },
  { bengali: 'প্রেম', english: 'Love', pronunciation: 'prem' },
  { bengali: 'বই', english: 'Book', pronunciation: 'boi' },
  { bengali: 'জল', english: 'Water', pronunciation: 'jol' },
  { bengali: 'খাবার', english: 'Food', pronunciation: 'khabar' },
  { bengali: 'বাড়ি', english: 'Home', pronunciation: 'bari' },
  { bengali: 'মা', english: 'Mother', pronunciation: 'ma' },
  { bengali: 'বাবা', english: 'Father', pronunciation: 'baba' },
  { bengali: 'বন্ধু', english: 'Friend', pronunciation: 'bondhu' },
  { bengali: 'সুন্দর', english: 'Beautiful', pronunciation: 'shundor' },
];

interface LanguagePageProps {
  onBack: () => void;
}

export function LanguagePage({ onBack }: LanguagePageProps) {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [wordInput, setWordInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const speakText = (text: string, lang: string = 'bn-IN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredWords = bengaliWords.filter(
    (word) =>
      word.bengali.includes(searchQuery) ||
      word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.pronunciation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          
          <h1 className="text-5xl md:text-6xl font-sans-serif text-slate-900 mb-2 tracking-tight">
            Bangla Bhasha: The Sweetest Language
          </h1>
          <p className="text-xl text-slate-600">
            Explore the richness of Bengali Language
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Interactive Quiz Section */}
        <section>
          <h2 className="text-4xl font-sans-serif text-slate-900 mb-8 border-b border-slate-200 pb-4">
            Test Your Knowledge
          </h2>
          <LanguageQuiz />
        </section>
        {/* Learn Bengali Script Section */}
        <section>
          <h2 className="text-4xl font-sans-serif text-slate-900 mb-8 border-b border-slate-200 pb-4">
            Learn Bengali Script
          </h2>
          
          {/* Vowels */}
          <div className="mb-8">
            <h3 className="text-2xl font-sans-serif text-amber-800 mb-4 border-b-2 border-orange-200 inline-block">
              Vowels (স্বরবর্ণ)
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-4">
              {bengaliAlphabets
                .filter((letter) => letter.type === 'vowel')
                .map((letter) => (
                  <div
                    key={letter.character}
                    className="relative group"
                  >
                    <Card 
                      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 hover:scale-105 border-orange-100 bg-white"
                      onClick={() => {
                        console.log('Playing:', letter.character);
                        speakText(letter.character);
                      }}
                      onMouseEnter={() => setHoveredLetter(letter.character)}
                      onMouseLeave={() => setHoveredLetter(null)}
                    >
                      <CardContent className="p-4 flex items-center justify-center aspect-square relative">
                        <div className="text-center relative z-10 pointer-events-none">
                          <div className="text-4xl mb-1">{letter.character}</div>
                          <div className="text-xs text-gray-500">{letter.pronunciation}</div>
                        </div>
                        {hoveredLetter === letter.character && (
                          <div className="absolute inset-1 flex items-center justify-center bg-orange-600/90 text-white rounded-md transition-all pointer-events-none">
                            <Play className="w-8 h-8" fill="currentColor" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          {/* Consonants */}
          <div>
            <h3 className="text-2xl font-sans-serif text-amber-800 mb-4 border-b-2 border-orange-200 inline-block">
              Consonants (ব্যঞ্জনবর্ণ)
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {bengaliAlphabets
                .filter((letter) => letter.type === 'consonant')
                .map((letter) => (
                  <div
                    key={letter.character}
                    className="relative group"
                  >
                    <Card 
                      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 hover:scale-105 border-orange-100 bg-white"
                      onClick={() => {
                        console.log('Playing:', letter.character);
                        speakText(letter.character);
                      }}
                      onMouseEnter={() => setHoveredLetter(letter.character)}
                      onMouseLeave={() => setHoveredLetter(null)}
                    >
                      <CardContent className="p-4 flex items-center justify-center aspect-square relative">
                        <div className="text-center relative z-10 pointer-events-none">
                          <div className="text-4xl mb-1">{letter.character}</div>
                          <div className="text-xs text-gray-500">{letter.pronunciation}</div>
                        </div>
                        {hoveredLetter === letter.character && (
                          <div className="absolute inset-1 flex items-center justify-center bg-orange-600/90 text-white rounded-md transition-all pointer-events-none">
                            <Play className="w-8 h-8" fill="currentColor" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Audio Pronunciations Section */}
        <section className="space-y-8">
          <h2 className="text-3xl text-gray-900">
            Audio Pronunciations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Word Pronunciation */}
            <Card>
              <CardHeader>
                <CardTitle>Pronounce a Word</CardTitle>
                <CardDescription>
                  Type a Bengali word to hear its pronunciation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter Bengali word..."
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    className="text-xl"
                  />
                  <Button
                    onClick={() => wordInput && speakText(wordInput)}
                    disabled={!wordInput}
                    size="lg"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Note: Audio pronunciation uses your browser's text-to-speech capabilities
                </p>
              </CardContent>
            </Card>

            {/* Word Search and Meanings */}
            <Card>
              <CardHeader>
                <CardTitle>Word Dictionary</CardTitle>
                <CardDescription>
                  Search for word meanings in Bengali
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Word List */}
          {searchQuery && (
            <Card>
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredWords.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredWords.map((word, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => speakText(word.bengali)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-2xl">{word.bengali}</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(word.bengali);
                            }}
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <strong>Meaning:</strong> {word.english}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {word.pronunciation}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No words found. Try a different search term.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Common Words Preview */}
          {!searchQuery && (
            <Card>
              <CardHeader>
                <CardTitle>Common Bengali Words</CardTitle>
                <CardDescription>
                  Click on any word to hear its pronunciation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bengaliWords.slice(0, 6).map((word, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => speakText(word.bengali)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-2xl">{word.bengali}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(word.bengali);
                          }}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <strong>Meaning:</strong> {word.english}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {word.pronunciation}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </motion.div>
  );
}