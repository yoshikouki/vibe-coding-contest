"use client";

import { useCallback, useState } from "react";
import * as Tone from 'tone'; // Import Tone.js
import {
  majorChordDefinitions, // Import Major definitions
  naturalMinorChordDefinitions, // Import Minor definitions
  otherChordDefinitions, // Import other definitions
  playNotes,
  playArpeggio, // Import playArpeggio
  ChordName
} from "../lib/audio"; // Import necessary items from audio.ts
import { Key } from "./KeySelector"; // Import Key type
import { Scale } from "./ScaleSelector"; // Import Scale type

// Define the base key for chordDefinitions (assumed to be C)
const BASE_KEY: Key = "C";

// TODO: Update layout based on scale (e.g., minor uses i, ii°, III)
const chordLayout: ChordName[][] = [
  ["I", "ii", "iii", "IV"],
  ["V", "vi", "vii", "V/V"],
  ["V/ii", "Iadd9", "IVmaj7", "Vsus4"],
  ["I", "IV", "V", "I"],
];

interface GridPadProps {
  selectedKey: Key;
  selectedScale: Scale;
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

export const GridPad: React.FC<GridPadProps> = ({ selectedKey, selectedScale }) => {
  const [activePad, setActivePad] = useState<string | null>(null); // State for active pad key
  const [arpeggioMode, setArpeggioMode] = useState<boolean>(false); // State for arpeggio mode

  const handlePadClick = useCallback((chord: ChordName, padKey: string) => { // Accept padKey
    setActivePad(padKey); // Set active pad
    setTimeout(() => setActivePad(null), 200); // Reset after 200ms

    let baseNotes: readonly string[] | undefined;

    // Select chord definitions based on the scale
    if (selectedScale === "Natural Minor") {
      // Attempt to find in minor definitions first, then others
      baseNotes = (naturalMinorChordDefinitions as any)[chord] ?? (otherChordDefinitions as any)[chord];
    } else {
      // Default to Major scale definitions, then others
      baseNotes = (majorChordDefinitions as any)[chord] ?? (otherChordDefinitions as any)[chord];
    }

    if (!baseNotes) {
      console.warn(`Chord definition not found for: ${chord} in ${selectedScale}`);
      return;
    }

    // Transpose the selected base notes
    const transposedNotes = baseNotes.map(note => transposeNote(note, BASE_KEY, selectedKey));

    // Play chord or arpeggio based on mode
    if (arpeggioMode) {
      playArpeggio(transposedNotes);
    } else {
      playNotes(transposedNotes);
    }

  }, [selectedKey, selectedScale, arpeggioMode]);

  const toggleArpeggioMode = () => {
    setArpeggioMode(prev => !prev);
  };

  return (
    <div> { /* Wrap in a div to place button above grid */ }
      <div className="mb-2 flex justify-end">
        <button 
          onClick={toggleArpeggioMode}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${arpeggioMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Arpeggio: {arpeggioMode ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-lg">
        {/* TODO: Display chord names based on scale (e.g., i, ii°, III) */}
        {chordLayout.map((row, i) => (
          <div key={i} className="contents">
            {row.map((chord, j) => {
              const padKey = `${i}-${j}`; // Create unique key for the pad
              return (
                <button
                  key={padKey}
                  className={`aspect-square rounded-lg shadow-md flex items-center justify-center text-lg font-bold transition-colors duration-100 \
                    ${activePad === padKey 
                      ? 'bg-blue-200 scale-95' // Active style
                      : 'bg-white hover:bg-blue-50 active:bg-blue-100' // Default style
                    }`}
                  onClick={() => handlePadClick(chord, padKey)} // Pass padKey
                >
                  {chord}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}; 