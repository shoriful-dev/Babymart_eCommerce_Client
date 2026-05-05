'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductImageZoomProps {
  src: string;
  alt: string;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ src, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 group cursor-zoom-in aspect-square"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-transform duration-300 ease-out ${showZoom ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
        priority
      />
      
      {showZoom && (
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Zoom indicator/instruction */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Hover to Zoom
      </div>
    </div>
  );
};

export default ProductImageZoom;
