import * as Tone from "tone";

// コード定義
const chordDefinitions = {
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
};

// シンセサイザーの初期化
const synth = new Tone.PolySynth().toDestination();

// コードを再生する関数
export const playChord = (chordName: keyof typeof chordDefinitions) => {
  const notes = chordDefinitions[chordName];
  synth.triggerAttackRelease(notes, "2n");
};

// オーディオコンテキストの初期化
export const initAudio = async () => {
  await Tone.start();
  console.log("Audio is ready");
}; 