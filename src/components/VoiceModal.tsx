
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, Mic, SkipBack, SkipForward } from 'lucide-react';
import MagicalButton from './MagicalButton';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const voiceStories = [
  {
    title: "The Raven",
    author: "Edgar Allan Poe",
    text: "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore...",
    audioUrl: "https://www.soundjay.com/misc/sounds-of-speech/the-raven.mp3", // Placeholder
    duration: "5:23"
  },
  {
    title: "Daffodils",
    author: "William Wordsworth", 
    text: "I wandered lonely as a cloud That floats on high o'er vales and hills, When all at once I saw a crowd...",
    audioUrl: "https://www.soundjay.com/misc/sounds-of-speech/daffodils.mp3", // Placeholder
    duration: "3:45"
  },
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    text: "But soft, what light through yonder window breaks? It is the east, and Juliet is the sun...",
    audioUrl: "https://www.soundjay.com/misc/sounds-of-speech/romeo-juliet.mp3", // Placeholder  
    duration: "4:12"
  }
];

const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [voiceType, setVoiceType] = useState('Dramatic');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startSpeech();
    } else {
      pauseSpeech();
    }
  }, [isPlaying, currentStory, voiceType, playbackRate]);

  const startSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(voiceStories[currentStory].text);
      const voices = synthRef.current.getVoices();
      
      // Select voice based on voice type
      let selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('male')
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = playbackRate;
      utterance.volume = volume;
      utterance.pitch = voiceType === 'Dramatic' ? 0.8 : 1.0;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    }
  };

  const pauseSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const newStory = currentStory > 0 ? currentStory - 1 : voiceStories.length - 1;
    setCurrentStory(newStory);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const newStory = currentStory < voiceStories.length - 1 ? currentStory + 1 : 0;
    setCurrentStory(newStory);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-4">Voice Magic</h2>
        <p className="text-purple-200 mb-6">Listen to expressive storytelling with AI-powered narration</p>

        {/* Story Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {voiceStories.map((story, index) => (
            <MagicalButton
              key={index}
              variant={currentStory === index ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCurrentStory(index);
                setIsPlaying(false);
              }}
            >
              {story.title}
            </MagicalButton>
          ))}
        </div>

        {/* Audio Visualizer */}
        <div className="bg-black/30 rounded-xl h-32 mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="flex space-x-2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{
                  height: isPlaying ? `${Math.random() * 80 + 20}px` : '20px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Current Story Display */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <h3 className="text-cyan-400 font-medium mb-2">{voiceStories[currentStory].title}</h3>
          <p className="text-purple-200 text-sm mb-2">by {voiceStories[currentStory].author}</p>
          <p className="text-white text-lg leading-relaxed">
            "{voiceStories[currentStory].text}"
          </p>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <MagicalButton variant="outline" onClick={handlePrevious}>
            <SkipBack className="w-4 h-4" />
          </MagicalButton>
          
          <MagicalButton
            onClick={handlePlayPause}
            className="w-16 h-16 rounded-full"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </MagicalButton>
          
          <MagicalButton variant="outline" onClick={handleNext}>
            <SkipForward className="w-4 h-4" />
          </MagicalButton>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <label className="block text-white text-sm mb-1">Speed</label>
            <select 
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <label className="block text-white text-sm mb-1">Voice</label>
            <select 
              value={voiceType}
              onChange={(e) => setVoiceType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              <option value="Dramatic">Dramatic</option>
              <option value="Gentle">Gentle</option>
              <option value="Mysterious">Mysterious</option>
            </select>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <label className="block text-white text-sm mb-1">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 flex items-center justify-center">
            <MagicalButton variant="outline" size="sm">
              <Mic className="w-4 h-4 mr-2" />
              Record
            </MagicalButton>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <MagicalButton className="flex-1">
            Download Audio
          </MagicalButton>
          <MagicalButton variant="outline" onClick={onClose}>
            Close
          </MagicalButton>
        </div>
      </div>
    </div>
  );
};

export default VoiceModal;
