# Kolkata Tourism Website

A beautiful tourism website showcasing Kolkata's rich culture, art, history, and language. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## Features

### 🏠 Homepage
- Full-screen Howrah Bridge background image
- Smooth scroll animations
- Navigation to three main sections
- Responsive design

### 🎨 Art Gallery
- Grid layout showcasing traditional Bengali art
- Categories: Terracotta Art, Alpana Designs, Vintage Trams, Bengali Calligraphy
- Hover popups with artwork details
- Search and category filters
- Lightbox view for detailed artwork inspection
- Smooth page transitions

### 📜 History Page
- Nostalgic stories about Kolkata in beautiful card format
- Audio narration feature for stories
- Timeline of West Bengal festivals with hover descriptions
- Interactive heritage map - "Explore Kolkata"
- Clickable locations with detailed information and images

### 🗣️ Language Page - "Bangla Bhasha: The Sweetest Language"
- Interactive Bengali Script learning
  - Vowels (স্বরবর্ণ) and Consonants (ব্যঞ্জনবর্ণ)
  - Click on any letter to hear audio pronunciation
  - Visual feedback with play button overlay
- Audio Pronunciations
  - Word input with text-to-speech
  - Searchable Bengali dictionary
  - Common Bengali words with meanings and pronunciations
- Interactive Bengali Script Quiz
  - Multiple choice questions
  - Score tracking
  - Immediate feedback

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Shadcn/UI** - Component library
- **Lucide React** - Icons
- **Recharts** - Charts and visualizations
- **Web Speech API** - Audio pronunciation

## Getting Started

### Prerequisites
- Node.js 16+ installed on your machine

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
kolkata-tourism/
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── figma/           # Figma-specific components
│   ├── ArtGallery.tsx   # Art gallery page
│   ├── HistoryPage.tsx  # History & festivals page
│   ├── LanguagePage.tsx # Bengali language learning
│   └── LanguageQuiz.tsx # Interactive quiz component
├── styles/
│   └── globals.css      # Global styles and Tailwind config
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## Features in Detail

### Audio Functionality
The website uses the browser's built-in Web Speech Synthesis API for:
- Bengali letter pronunciation
- Word pronunciation
- Story narration

**Note:** Audio features work best in modern browsers (Chrome, Edge, Safari). Make sure to interact with the page before audio can play (browser security requirement).

### Animations
Smooth animations throughout using Motion:
- Page transitions
- Scroll animations
- Hover effects
- Entrance animations

### Responsive Design
The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Browser Support

- Chrome/Edge (recommended for best audio support)
- Firefox
- Safari
- Opera

## Troubleshooting

### Audio Not Working
- Make sure you're using a modern browser
- Check that audio is not muted in your browser
- Try clicking on elements (browsers require user interaction before playing audio)
- For Bengali pronunciation, the browser needs Bengali language support

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Vite will automatically use the next available port (5174, 5175, etc.)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Credits

- Images from Unsplash
- Icons from Lucide React
- UI Components from Shadcn/UI
- Bengali language content curated for educational purposes

---

Built with ❤️ for preserving Kolkata's rich cultural heritage
