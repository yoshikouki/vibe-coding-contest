"use client";

import { useCallback, useState } from "react";
import { GridPad } from "../components/GridPad";
import { initAudio } from "../lib/audio";
import { KeySelector, Key } from "../components/KeySelector";

export default function Home() {
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [selectedKey, setSelectedKey] = useState<Key>("C");

  const handleFirstInteraction = useCallback(async () => {
    if (!isAudioInitialized) {
      await initAudio();
      setIsAudioInitialized(true);
    }
  }, [isAudioInitialized]);

  const handleKeyChange = (key: Key) => {
    setSelectedKey(key);
  };

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50"
      onClick={handleFirstInteraction}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Vibe Coding Contest</h1>
      <div className="w-full max-w-xs mb-8">
        <KeySelector selectedKey={selectedKey} onKeyChange={handleKeyChange} />
      </div>
      <div className="w-full max-w-2xl">
        <GridPad selectedKey={selectedKey} />
      </div>
      <p className="mt-8 text-gray-600 text-center">
        グリッドをクリックして演奏を始めましょう！
      </p>
    </main>
  );
} 