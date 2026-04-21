"use client";
import { useState } from "react";
import Particles from "@/components/Particles";
import AddButton from "@/components/AddButton";
import JobModal from "@/components/JobModal";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={150}
          particleColors={["#00c97a", "#b6ffd9"]}
          particleSize={2}
          className="h-full w-full"
          moveSpeed={2}
          interactive={true}
        />
      </div>

      <div className="relative z-10 p-10 lg:p-14">
        <div className="flex justify-between items-start">
          <AddButton 
            onClick={() => setIsModalOpen(true)} 
            text="Add job" 
            color="#00c97a" 
            textColor="#b6ffd9" 
          />

          <div className="text-right select-none">
            <h1 className="text-2xl font-bold text-white tracking-tighter">KINTSUGI</h1>
            <p className="text-[10px] text-[#00c97a] font-mono tracking-[0.2em] uppercase">Status: Active</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <JobModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            color="#00c97a" 
            />
      )}
    </main>
  );
}