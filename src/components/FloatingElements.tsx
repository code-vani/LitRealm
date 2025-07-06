
import React from 'react';
import { Book, Feather, Star, Sparkles, Zap, Heart } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Book, delay: '0s', duration: '6s', x: '10%', y: '20%' },
    { Icon: Feather, delay: '1s', duration: '8s', x: '80%', y: '15%' },
    { Icon: Star, delay: '2s', duration: '7s', x: '70%', y: '60%' },
    { Icon: Sparkles, delay: '0.5s', duration: '9s', x: '20%', y: '70%' },
    { Icon: Zap, delay: '3s', duration: '5s', x: '90%', y: '40%' },
    { Icon: Heart, delay: '1.5s', duration: '10s', x: '15%', y: '50%' },
  ];

  return (
    <>
      {elements.map(({ Icon, delay, duration, x, y }, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-20 opacity-30"
          style={{
            left: x,
            top: y,
            animation: `float ${duration} infinite ease-in-out`,
            animationDelay: delay,
          }}
        >
          <Icon 
            className="w-8 h-8 text-cyan-300" 
            style={{
              filter: 'drop-shadow(0 0 10px rgba(103, 232, 249, 0.5))',
            }}
          />
        </div>
      ))}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
      `}</style>
    </>
  );
};

export default FloatingElements;
