import React, { useState, ChangeEvent } from 'react';
import 'tailwindcss/tailwind.css';
import { stopwords } from './utils/stopWord';

const getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16);

const getRandomPosition = (): { top: string; left: string } => ({
  top: `${Math.random() * 70}vh`,
  left: `${Math.random() * 80}vw`,
});

const getRandomSize = (): string => `${Math.floor(Math.random() * 20 + 10)}px`;

const getTextColor = (background: string): string => {
  const hex = background.slice(1);
  const [r, g, b] = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)].map((color) => parseInt(color, 16));
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'text-gray-800' : 'text-white';
};

const WordCloudGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [wordCloud, setWordCloud] = useState<
    Array<{ text: string; size: string; color: string; position: { top: string; left: string } }>
  >([]);
  const [wordFrequencies, setWordFrequencies] = useState<{ [key: string]: number }>({});

  const generateWordCloud = () => {
    const words = inputText.toLowerCase().split(/\W+/).filter((word) => !stopwords.includes(word));

    const wordArray = words.map((text) => ({
      text,
      size: getRandomSize(),
      color: getRandomColor(),
      position: getRandomPosition(),
    }));

    
    const frequencies: { [key: string]: number } = {};
    words.forEach((word) => {
      frequencies[word] = (frequencies[word] || 0) + 1;
    });

    setWordFrequencies(frequencies);
    setWordCloud(wordArray);
  };

 
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-md mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Word Cloud Generator</h1>
        <p className="text-white">Enter your text and click "Generate Word Cloud" to see the magic!</p>
      </div>

      <div className="flex">
        <div className="w-2/3 pr-4">
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
            value={inputText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            placeholder="Enter text..."
          ></textarea>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300"
            onClick={generateWordCloud}
          >
            Generate Word Cloud
          </button>

          <div className="relative min-h-screen flex items-center justify-center my-5">
            <div className="w-full md:w-[80%] h-[600px] mx-auto relative overflow-hidden bg-white rounded-lg shadow-md p-4">
              {wordCloud.map((word, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: word.position.top,
                    left: word.position.left,
                    transform: 'translate(-50%, -50%)',
                    fontSize: word.size,
                    color: word.color,
                    borderRadius: '0.25rem',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    zIndex: 1,
                  }}
                  className={`text-center ${getTextColor(word.color)} font-medium transform hover:scale-110`}
                >
                  {word.text}
                </div>
              ))}
            </div>
          </div>

         
        </div>

        <div className="w-1/3">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Word Frequencies</h2>
            {Object.entries(wordFrequencies).map(([word, count]) => (
              <div key={word} className="mb-2">
                {word}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCloudGenerator;
