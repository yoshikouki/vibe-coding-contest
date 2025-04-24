import * as Tone from "tone";

// コード定義
export const chordDefinitions = {
  // ダイアトニックコード
  I: ["C4", "E4", "G4"],
  ii: ["D4", "F4", "A4"],
  iii: ["E4", "G4", "B4"],
  IV: ["F4", "A4", "C5"],
  V: ["G4", "B4", "D5"],
  vi: ["A4", "C5", "E5"],
  vii: ["B4", "D5", "F5"],

  // セカンダリードミナント
  "V/V": ["D4", "F#4", "A4"],
  "V/ii": ["A4", "C#5", "E5"],

  // テンションコード
  "Iadd9": ["C4", "E4", "G4", "D5"],
  "IVmaj7": ["F4", "A4", "C5", "E5"],
  "Vsus4": ["G4", "C5", "D5"],
} as const;

export type ChordName = keyof typeof chordDefinitions;

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