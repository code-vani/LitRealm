
import React, { useState } from 'react';
import { Book, Headphones, Wand2, Star, Sparkles, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MagicalButton from './MagicalButton';
import ParticleBackground from './ParticleBackground';
import { Card } from '@/components/ui/card';
import ARVRModal from './ARVRModal';
import VoiceModal from './VoiceModal';
import AICoWriterModal from './AICoWriterModal';
import StoryExploreModal from './StoryExploreModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const featuredStories = [
    { 
      title: "Alice in Wonderland", 
      author: "Lewis Carroll", 
      mood: "Whimsical", 
      color: "from-purple-500 to-pink-500",
      description: "Fall down the rabbit hole in VR"
    },
    { 
      title: "The Raven", 
      author: "Edgar Allan Poe", 
      mood: "Dark", 
      color: "from-gray-700 to-purple-900",
      description: "Experience the haunting atmosphere"
    },
    { 
      title: "Daffodils", 
      author: "William Wordsworth", 
      mood: "Peaceful", 
      color: "from-green-400 to-blue-500",
      description: "Walk among golden daffodils"
    }
  ];

  const recentExperiences = [
    { title: "Romeo & Juliet", progress: 75, type: "AR Experience" },
    { title: "The Road Not Taken", progress: 100, type: "Voice Story" },
    { title: "My AI Poem", progress: 50, type: "Co-Creation" }
  ];

  const moodRecommendations = [
    { mood: "Adventurous", icon: "🗡️", books: 3, onClick: () => setActiveModal('explore') },
    { mood: "Romantic", icon: "💕", books: 5, onClick: () => setActiveModal('explore') },
    { mood: "Mysterious", icon: "🔮", books: 4, onClick: () => setActiveModal('explore') },
    { mood: "Peaceful", icon: "🌸", books: 6, onClick: () => setActiveModal('explore') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      <ParticleBackground />
      
      <div className="relative z-30 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Welcome back, {user?.name || 'Reader'} ✨
            </h1>
            <p className="text-purple-200 mt-2">Ready to dive into magical worlds?</p>
          </div>
          
          <div className="flex space-x-4">
            <MagicalButton variant="outline" onClick={() => setActiveModal('explore')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Explore
            </MagicalButton>
            <MagicalButton onClick={() => setActiveModal('ai-writer')}>
              <Wand2 className="w-4 h-4 mr-2" />
              Create
            </MagicalButton>
            <MagicalButton variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </MagicalButton>
          </div>
        </div>

        {/* Featured Story */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 mb-8 hover:bg-white/15 transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-4xl animate-float">
              📚
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">Today's Featured Experience</h2>
              <h3 className="text-xl text-cyan-400 mb-4">The Great Gatsby - F. Scott Fitzgerald</h3>
              <p className="text-purple-200 mb-6">
                Step into the Jazz Age and experience the lavish parties of West Egg in stunning AR. 
                Feel the music, see the lights, and witness Gatsby's story unfold around you.
              </p>
              
              <MagicalButton 
                size="lg"
                onClick={() => setActiveModal('ar-vr')}
              >
                <Book className="w-5 h-5 mr-2" />
                Enter AR Experience
                <ArrowRight className="w-5 h-5 ml-2" />
              </MagicalButton>
            </div>
          </div>
        </Card>

        {/* Story Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredStories.map((story, index) => (
            <Card
              key={index}
              className="group bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`h-32 bg-gradient-to-r ${story.color} rounded-xl mb-4 flex items-center justify-center text-4xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10">📖</span>
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{story.title}</h3>
              <p className="text-cyan-400 text-sm mb-2">{story.author}</p>
              <p className="text-purple-200 text-sm mb-4">{story.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-purple-500/30 rounded-full text-purple-200 text-xs">
                  {story.mood}
                </span>
                <MagicalButton 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setActiveModal('ar-vr')}
                >
                  Start <ArrowRight className="w-3 h-3 ml-1" />
                </MagicalButton>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Experiences & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Experiences */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-cyan-400" />
              Recent Experiences
            </h2>
            
            <div className="space-y-4">
              {recentExperiences.map((exp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div>
                    <h3 className="text-white font-medium">{exp.title}</h3>
                    <p className="text-purple-200 text-sm">{exp.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 text-sm font-medium">{exp.progress}%</div>
                    <div className="w-16 h-2 bg-white/20 rounded-full mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${exp.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mood Recommendations */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
              Mood-Based Picks
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {moodRecommendations.map((rec, index) => (
                <div 
                  key={index}
                  onClick={rec.onClick}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/15 transition-all duration-300 cursor-pointer group text-center"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {rec.icon}
                  </div>
                  <h3 className="text-white font-medium mb-1">{rec.mood}</h3>
                  <p className="text-purple-200 text-sm">{rec.books} stories</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <MagicalButton 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => setActiveModal('voice')}
          >
            <Headphones className="w-5 h-5 mr-2" />
            Voice Stories
          </MagicalButton>
          <MagicalButton 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => setActiveModal('ai-writer')}
          >
            <Wand2 className="w-5 h-5 mr-2" />
            AI Co-Writer
            <Sparkles className="w-5 h-5 ml-2" />
          </MagicalButton>
        </div>
      </div>

      {/* Modals */}
      <ARVRModal 
        isOpen={activeModal === 'ar-vr'} 
        onClose={() => setActiveModal(null)}
        title="The Great Gatsby AR Experience"
        description="Step into the Jazz Age and experience the lavish parties of West Egg in stunning augmented reality."
      />
      
      <VoiceModal 
        isOpen={activeModal === 'voice'} 
        onClose={() => setActiveModal(null)} 
      />
      
      <AICoWriterModal 
        isOpen={activeModal === 'ai-writer'} 
        onClose={() => setActiveModal(null)} 
      />
      
      <StoryExploreModal 
        isOpen={activeModal === 'explore'} 
        onClose={() => setActiveModal(null)}
        onSelectStory={(story) => {
          console.log('Selected story:', story);
          setActiveModal('ar-vr');
        }}
      />
    </div>
  );
};

export default Dashboard;
