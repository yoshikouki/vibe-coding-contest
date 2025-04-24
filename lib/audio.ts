import * as Tone from "tone";

// === コード定義 (C基準) ===

// C Major Scale Diatonic Chords
export const majorChordDefinitions = {
  I: ["C4", "E4", "G4"],    // C Major
  ii: ["D4", "F4", "A4"],    // D minor
  iii: ["E4", "G4", "B4"],   // E minor
  IV: ["F4", "A4", "C5"],    // F Major
  V: ["G4", "B4", "D5"],    // G Major
  vi: ["A4", "C5", "E5"],    // A minor
  vii: ["B4", "D5", "F5"],   // B diminished
} as const;

// C Natural Minor Scale Diatonic Chords
export const naturalMinorChordDefinitions = {
  i: ["C4", "Eb4", "G4"],   // C minor
  ii: ["D4", "F4", "Ab4"],  // D diminished
  III: ["Eb4", "G4", "Bb4"], // Eb Major
  iv: ["F4", "Ab4", "C5"],  // F minor
  v: ["G4", "Bb4", "D5"],  // G minor
  VI: ["Ab4", "C5", "Eb5"], // Ab Major
  VII: ["Bb4", "D5", "F5"], // Bb Major
} as const;

// --- 他のコード (スケールによる変更は一旦省略) ---
export const otherChordDefinitions = {
  // セカンダリードミナント
  "V/V": ["D4", "F#4", "A4"],
  "V/ii": ["A4", "C#5", "E5"],
  // テンションコード (Major基準のまま)
  "Iadd9": ["C4", "E4", "G4", "D5"],
  "IVmaj7": ["F4", "A4", "C5", "E5"],
  "Vsus4": ["G4", "C5", "D5"],
} as const;

// --- 型定義 ---
// ダイアトニックコードの型名を統合 (大文字/小文字を区別しないように、全て大文字にするなど検討の余地あり)
type MajorDiatonicChordName = keyof typeof majorChordDefinitions;
type MinorDiatonicChordName = keyof typeof naturalMinorChordDefinitions;
type OtherChordName = keyof typeof otherChordDefinitions;
export type ChordName = MajorDiatonicChordName | MinorDiatonicChordName | OtherChordName;

// シンセサイザーのインスタンス (クライアントサイドで初期化)
let synth: Tone.PolySynth<Tone.Synth>;

// シンセサイザーを初期化する関数
const initializeSynth = () => {
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "triangle8",
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  }).toDestination();
  console.log("Synth initialized");
};

// コードを再生する関数 (Note配列を受け取るように変更)
export const playNotes = (notes: string[]) => {
  if (!synth) {
    console.warn("Synth not initialized yet.");
    return;
  }
  synth.triggerAttackRelease(notes, "8n");
};

// オーディオコンテキストとシンセサイザーの初期化
export const initAudio = async () => {
  await Tone.start();
  console.log("Audio context started");
  // Synthをクライアントサイドで初期化
  if (typeof window !== 'undefined' && !synth) {
    initializeSynth();
  }
}; 