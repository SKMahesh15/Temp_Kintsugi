"use client";
import { useState } from "react";
import DotGrid from "@/components/DotGrid";
import AddButton from "@/components/AddButton";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2F293A"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="relative z-10 w-full h-full p-12 lg:p-20">
        <div className="flex justify-between items-start w-full">
          <AddButton onClick={() => setIsModalOpen(true)} text="Add job" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-white text-xl font-semibold mb-6">Create New Job</h2>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}