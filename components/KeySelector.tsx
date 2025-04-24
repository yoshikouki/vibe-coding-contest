"use client";

import React from 'react';

const keys = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
] as const;

export type Key = typeof keys[number];

interface KeySelectorProps {
  selectedKey: Key;
  onKeyChange: (key: Key) => void;
}

export const KeySelector: React.FC<KeySelectorProps> = ({ selectedKey, onKeyChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="key-select" className="block text-sm font-medium text-gray-700 mb-1">
        キーを選択:
      </label>
      <select
        id="key-select"
        value={selectedKey}
        onChange={(e) => onKeyChange(e.target.value as Key)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}; 