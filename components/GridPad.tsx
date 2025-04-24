"use client";

import { useCallback } from "react";
import { playChord } from "../lib/audio";

const chordLayout = [
  ["I", "ii", "iii", "IV"],
  ["V", "vi", "vii", "V/V"],
  ["V/ii", "Iadd9", "IVmaj7", "Vsus4"],
  ["I", "IV", "V", "I"],
] as const;

export const GridPad = () => {
  const handlePadClick = useCallback((chord: string) => {
    playChord(chord as any); // TODO: 型の修正
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-lg">
      {chordLayout.map((row, i) => (
        <div key={i} className="contents">
          {row.map((chord, j) => (
            <button
              key={`${i}-${j}`}
              className="aspect-square bg-white hover:bg-blue-50 active:bg-blue-100 rounded-lg shadow-md flex items-center justify-center text-lg font-bold transition-colors"
              onClick={() => handlePadClick(chord)}
            >
              {chord}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}; 