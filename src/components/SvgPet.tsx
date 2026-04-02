'use client';

import { useEffect, useState } from 'react';

interface SvgPetProps {
  fileName: string;
  className?: string;
}

export default function SvgPet({ fileName, className = '' }: SvgPetProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(`/pets/${fileName}`)
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(() => setSvgContent(''));
  }, [fileName]);

  if (!svgContent) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
