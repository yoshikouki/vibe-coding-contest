"use client";

import { useEffect } from "react";
import { GridPad } from "../components/GridPad";
import { initAudio } from "../lib/audio";

export default function Home() {
  useEffect(() => {
    initAudio();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Vibe Coding Contest</h1>
      <div className="w-full max-w-2xl">
        <GridPad />
      </div>
      <p className="mt-8 text-gray-600 text-center">
        グリッドをクリックして演奏を始めましょう！
      </p>
    </main>
  );
} 