import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder / Blur Effect */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-brand-paper/50 backdrop-blur-xl z-10"
          />
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ${imgClassName} ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg"
        }`}
      />
    </div>
  );
}
