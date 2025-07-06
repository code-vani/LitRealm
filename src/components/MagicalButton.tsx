
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagicalButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

const MagicalButton = ({ children, className, variant = "default", ...props }: MagicalButtonProps) => {
  const baseClasses = cn(
    "relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl",
    variant === "default" && "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-0",
    variant === "outline" && "border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10",
    variant === "ghost" && "text-purple-200 hover:text-white hover:bg-white/10",
    className
  );

  return (
    <Button
      className={baseClasses}
      variant={variant}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "default" && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      </div>
    </Button>
  );
};

export default MagicalButton;
