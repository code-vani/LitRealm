
import React, { useState } from 'react';
import { X, Search, Filter, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MagicalButton from './MagicalButton';

interface Story {
  id: number;
  title: string;
  author: string;
  genre: string;
  mood: string;
  description: string;
  thumbnail: string;
}

interface StoryExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: Story) => void;
}

const stories: Story[] = [
  {
    id: 1,
    title: "The Raven",
    author: "Edgar Allan Poe",
    genre: "Poetry",
    mood: "Dark",
    description: "A haunting narrative poem about a man's encounter with a mysterious raven",
    thumbnail: "🐦‍⬛"
  },
  {
    id: 2,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    genre: "Fantasy",
    mood: "Whimsical",
    description: "Follow Alice down the rabbit hole into a magical world",
    thumbnail: "🐰"
  },
  {
    id: 3,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    genre: "Drama",
    mood: "Romantic",
    description: "The timeless tale of star-crossed lovers",
    thumbnail: "💕"
  },
  {
    id: 4,
    title: "The Road Not Taken",
    author: "Robert Frost",
    genre: "Poetry",
    mood: "Reflective",
    description: "A meditation on choices and their consequences",
    thumbnail: "🛤️"
  },
  {
    id: 5,
    title: "Hamlet",
    author: "William Shakespeare",
    genre: "Drama",
    mood: "Mysterious",
    description: "The tale of a prince's quest for revenge",
    thumbnail: "👑"
  },
  {
    id: 6,
    title: "I Wandered Lonely as a Cloud",
    author: "William Wordsworth",
    genre: "Poetry",
    mood: "Peaceful",
    description: "A celebration of nature's beauty and its effect on the soul",
    thumbnail: "🌼"
  }
];

const StoryExploreModal = ({ isOpen, onClose, onSelectStory }: StoryExploreModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMood, setSelectedMood] = useState('All');

  const genres = ['All', 'Poetry', 'Drama', 'Fantasy'];
  const moods = ['All', 'Dark', 'Whimsical', 'Romantic', 'Reflective', 'Mysterious', 'Peaceful'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || story.genre === selectedGenre;
    const matchesMood = selectedMood === 'All' || story.mood === selectedMood;
    
    return matchesSearch && matchesGenre && matchesMood;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-6xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-4">Explore Library</h2>
        <p className="text-purple-200 mb-6">Discover amazing stories and poems</p>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-purple-300" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stories or authors..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200"
            />
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-md p-2 text-white"
          >
            {genres.map(genre => (
              <option key={genre} value={genre} className="bg-purple-900">
                {genre} Genre
              </option>
            ))}
          </select>
          
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-md p-2 text-white"
          >
            {moods.map(mood => (
              <option key={mood} value={mood} className="bg-purple-900">
                {mood} Mood
              </option>
            ))}
          </select>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{story.thumbnail}</div>
                <h3 className="text-white font-semibold">{story.title}</h3>
                <p className="text-cyan-400 text-sm">{story.author}</p>
              </div>
              
              <p className="text-purple-200 text-sm mb-3">{story.description}</p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-purple-500/30 rounded text-purple-200 text-xs">
                  {story.genre}
                </span>
                <span className="px-2 py-1 bg-cyan-500/30 rounded text-cyan-200 text-xs">
                  {story.mood}
                </span>
              </div>
              
              <MagicalButton 
                size="sm" 
                className="w-full"
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
              >
                <Play className="w-3 h-3 mr-1" />
                Start Experience
              </MagicalButton>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-purple-200">No stories found matching your criteria.</p>
            <MagicalButton 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
                setSelectedMood('All');
              }}
            >
              Clear Filters
            </MagicalButton>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <MagicalButton variant="outline" onClick={onClose}>
            Close
          </MagicalButton>
        </div>
      </div>
    </div>
  );
};

export default StoryExploreModal;
