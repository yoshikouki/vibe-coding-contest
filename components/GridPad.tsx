"use client";

import { useCallback } from "react";
import * as Tone from 'tone'; // Import Tone.js
import { chordDefinitions, playNotes, ChordName } from "../lib/audio"; // Import necessary items from audio.ts
import { Key } from "./KeySelector"; // Import Key type

// Define the base key for chordDefinitions (assumed to be C)
const BASE_KEY: Key = "C";

const chordLayout: ChordName[][] = [
  ["I", "ii", "iii", "IV"],
  ["V", "vi", "vii", "V/V"],
  ["V/ii", "Iadd9", "IVmaj7", "Vsus4"],
  ["I", "IV", "V", "I"],
];

interface GridPadProps {
  selectedKey: Key;
}

// Helper function to transpose a single note
const transposeNote = (note: string, baseKey: Key, targetKey: Key): string => {
  try {
    const baseMidi = Tone.Frequency(baseKey + "0").toMidi(); // Octave 0 for base calculation
    const targetMidi = Tone.Frequency(targetKey + "0").toMidi();
    const interval = targetMidi - baseMidi; // Calculate interval in semitones

    const originalMidi = Tone.Frequency(note).toMidi();
    const transposedMidi = originalMidi + interval;
    return Tone.Frequency(transposedMidi, "midi").toNote();
  } catch (error) {
    console.error(`Error transposing note ${note}:`, error);
    return note; // Return original note on error
  }
};

export const GridPad: React.FC<GridPadProps> = ({ selectedKey }) => {
  const handlePadClick = useCallback((chord: ChordName) => {
    const baseNotes = chordDefinitions[chord];
    if (!baseNotes) {
      console.warn(`Chord definition not found for: ${chord}`);
      return;
    }

    // Transpose notes based on the selected key
    const transposedNotes = baseNotes.map(note => transposeNote(note, BASE_KEY, selectedKey));
    
    playNotes(transposedNotes);

  }, [selectedKey]); // Add selectedKey as dependency

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