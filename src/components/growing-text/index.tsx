import { useState, useEffect } from 'react';

interface GrowingTextProps {
  text: string;
}

const GrowingText: React.FC<GrowingTextProps> = ({ text }) => {
  const [fontSize, setFontSize] = useState('16px'); // Default font size

  useEffect(() => {
    const calculateFontSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const minDimension = Math.min(viewportWidth, viewportHeight);

      const maxPercentage = 15;
      const minPercentage = 5;

      const maxLength = 20;
      const percentage = text.length > maxLength
        ? minPercentage
        : maxPercentage - (text.length / maxLength) * (maxPercentage - minPercentage);

      const fontSizeInPixels = (percentage / 100) * minDimension;

      setFontSize(`${fontSizeInPixels}px`);
    };

    calculateFontSize();
    window.addEventListener('resize', calculateFontSize);

    return () => window.removeEventListener('resize', calculateFontSize);
  }, [text]);

  return (
    <div style={{ fontSize: fontSize, transition: 'font-size 0.3s ease' }}>
      {text}
    </div>
  );
};

export default GrowingText;
