"use client";

import React from 'react';

// Define common scales
const scales = [
  "Major",
  "Natural Minor",
  "Harmonic Minor",
  "Melodic Minor",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Locrian",
] as const;

export type Scale = typeof scales[number];

interface ScaleSelectorProps {
  selectedScale: Scale;
  onScaleChange: (scale: Scale) => void;
}

export const ScaleSelector: React.FC<ScaleSelectorProps> = ({ selectedScale, onScaleChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="scale-select" className="block text-sm font-medium text-gray-700 mb-1">
        スケールを選択:
      </label>
      <select
        id="scale-select"
        value={selectedScale}
        onChange={(e) => onScaleChange(e.target.value as Scale)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {scales.map((scale) => (
          <option key={scale} value={scale}>
            {scale}
          </option>
        ))}
      </select>
    </div>
  );
}; 