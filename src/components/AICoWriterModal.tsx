
import React, { useState } from 'react';
import { X, Wand2, RefreshCw, Send, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import MagicalButton from './MagicalButton';

interface AICoWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AICoWriterModal = ({ isOpen, onClose }: AICoWriterModalProps) => {
  const [userText, setUserText] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [theme, setTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdStories, setCreatedStories] = useState<string[]>([]);
  const { toast } = useToast();

  const suggestionTemplates = {
    mysterious: [
      "In the shadows of the ancient library, whispers echoed through forgotten corridors...",
      "The old key turned with a satisfying click, revealing secrets that had been buried for centuries...",
      "As the fog rolled in from the moor, strange lights began to dance between the trees..."
    ],
    romantic: [
      "Under the starlit sky, their eyes met across the crowded ballroom...",
      "The letter arrived on a spring morning, sealed with lavender wax and promises...",
      "In the garden where roses bloomed eternal, love found its perfect moment..."
    ],
    adventure: [
      "The ship's sails billowed as storm clouds gathered on the horizon...",
      "Deep in the jungle, the map led to treasures beyond imagination...",
      "With courage in her heart, she stepped through the portal to unknown worlds..."
    ],
    peaceful: [
      "By the quiet lake, morning mist danced with the first rays of sunlight...",
      "The old oak tree provided shade for countless summer afternoons...",
      "In the meadow where time seemed to stand still, peace filled every breath..."
    ]
  };

  const generateSuggestion = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let suggestions: string[] = [];
      
      if (theme.toLowerCase().includes('mysterious') || theme.toLowerCase().includes('mystery')) {
        suggestions = suggestionTemplates.mysterious;
      } else if (theme.toLowerCase().includes('romantic') || theme.toLowerCase().includes('love')) {
        suggestions = suggestionTemplates.romantic;
      } else if (theme.toLowerCase().includes('adventure') || theme.toLowerCase().includes('quest')) {
        suggestions = suggestionTemplates.adventure;
      } else if (theme.toLowerCase().includes('peaceful') || theme.toLowerCase().includes('calm')) {
        suggestions = suggestionTemplates.peaceful;
      } else {
        // Mix all suggestions for general themes
        suggestions = [
          ...suggestionTemplates.mysterious,
          ...suggestionTemplates.romantic,
          ...suggestionTemplates.adventure,
          ...suggestionTemplates.peaceful
        ];
      }
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setAiSuggestion(randomSuggestion);
      setIsGenerating(false);
      
      toast({
        title: "AI Suggestion Ready!",
        description: "Your AI companion has crafted a new suggestion.",
      });
    }, 1500);
  };

  const acceptSuggestion = () => {
    if (aiSuggestion) {
      setUserText(prev => prev + ' ' + aiSuggestion);
      setAiSuggestion('');
      toast({
        title: "Suggestion Added!",
        description: "The AI suggestion has been added to your story.",
      });
    }
  };

  const saveCreation = () => {
    if (userText.trim()) {
      setCreatedStories(prev => [...prev, userText]);
      toast({
        title: "Story Saved!",
        description: "Your creation has been saved to your collection.",
      });
      setUserText('');
      setAiSuggestion('');
      setTheme('');
    }
  };

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

        <h2 className="text-3xl font-bold text-white mb-4">AI Co-Writer</h2>
        <p className="text-purple-200 mb-6">Create poetry and stories with your AI companion</p>

        {/* Theme Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Theme/Mood</label>
          <Input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., mysterious, romantic, adventure, peaceful..."
            className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
          />
        </div>

        {/* Writing Area */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* User Input */}
          <div>
            <label className="block text-white font-medium mb-2">Your Story</label>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Start writing your story or poem... The AI will help you continue!"
              className="w-full h-64 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder:text-purple-200 resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            
            <div className="mt-2 text-purple-200 text-sm">
              Words: {userText.split(' ').filter(word => word.length > 0).length}
            </div>
          </div>

          {/* AI Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">AI Suggestions</label>
              <MagicalButton 
                variant="ghost" 
                size="sm" 
                onClick={generateSuggestion}
                disabled={isGenerating}
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate'}
              </MagicalButton>
            </div>
            
            <div className="h-64 bg-white/5 border border-white/20 rounded-lg p-4">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Wand2 className="w-8 h-8 mx-auto mb-2 text-cyan-400 animate-pulse" />
                    <p className="text-purple-200">AI is crafting your suggestion...</p>
                  </div>
                </div>
              ) : aiSuggestion ? (
                <div>
                  <p className="text-cyan-300 mb-4 italic">"{aiSuggestion}"</p>
                  <div className="flex gap-2">
                    <MagicalButton size="sm" onClick={acceptSuggestion}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Accept
                    </MagicalButton>
                    <MagicalButton variant="outline" size="sm" onClick={generateSuggestion}>
                      Try Again
                    </MagicalButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-purple-200">
                  <div className="text-center">
                    <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Click "Generate" to get AI suggestions</p>
                    <p className="text-sm mt-1">Add a theme for better suggestions!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Live AR Preview</label>
          <div className="h-24 bg-black/30 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
            <p className="text-purple-200 z-10">
              {userText ? "AR scene adapts to your writing in real-time ✨" : "Start writing to see your AR world come alive!"}
            </p>
          </div>
        </div>

        {/* Saved Stories */}
        {createdStories.length > 0 && (
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Your Saved Creations</label>
            <div className="bg-white/5 rounded-lg p-4 max-h-32 overflow-y-auto">
              {createdStories.map((story, index) => (
                <div key={index} className="text-purple-200 text-sm mb-2 p-2 bg-white/5 rounded">
                  "{story.substring(0, 100)}..."
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <MagicalButton onClick={saveCreation} disabled={!userText.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Save Creation
          </MagicalButton>
          <MagicalButton variant="outline">
            Export as AR Experience
          </MagicalButton>
          <MagicalButton variant="outline">
            Share with Community
          </MagicalButton>
          <MagicalButton variant="outline" onClick={onClose}>
            Close
          </MagicalButton>
        </div>
      </div>
    </div>
  );
};

export default AICoWriterModal;
