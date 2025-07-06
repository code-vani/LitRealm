
import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Wand2, Book, Headphones, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingElements from '@/components/FloatingElements';
import MagicalButton from '@/components/MagicalButton';

const Index = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingElements />
      
      {/* Magical cursor trail */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full pointer-events-none opacity-70 transition-all duration-300 z-50"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-40 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            LITREALM
          </h1>
        </div>
        
        <div className="flex space-x-4">
          <MagicalButton variant="ghost" onClick={() => navigate('/login')}>
            Login
          </MagicalButton>
          <MagicalButton onClick={() => navigate('/signup')}>
            Sign Up
          </MagicalButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Where Stories
            <br />
            Come Alive
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience literature in magical AR/VR worlds, co-create with AI, and discover stories that match your soul
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Book, title: "AR/VR Stories", desc: "Step inside your favorite tales" },
            { icon: Headphones, title: "Voice Magic", desc: "Listen to expressive storytelling" },
            { icon: Wand2, title: "AI Co-Writer", desc: "Create poetry with artificial muse" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:rotate-1"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <feature.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-purple-200">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <MagicalButton 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => navigate('/dashboard')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Enter the Realm
          </MagicalButton>
          
          <MagicalButton 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => navigate('/explore')}
          >
            <Star className="w-5 h-5 mr-2" />
            Explore Library
          </MagicalButton>
        </div>
      </div>

      {/* Floating Quote */}
      <div className="fixed bottom-10 right-10 max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 animate-float z-30">
        <p className="text-purple-200 italic text-sm">
          "A reader lives a thousand lives before he dies... The man who never reads lives only one."
        </p>
        <p className="text-cyan-400 text-xs mt-2">- George R.R. Martin</p>
      </div>
    </div>
  );
};

export default Index;
