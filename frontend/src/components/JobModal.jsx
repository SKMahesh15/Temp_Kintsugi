import React from 'react';

const JobModal = ({ isOpen, onClose, color = "#00c97a" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div 
        className="w-full max-w-lg bg-[#0a0f0c] border rounded-2xl p-8 shadow-2xl"
        style={{ borderColor: `${color}33` }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">Create Automation Job</h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Kintsugi / Task-Dispatcher</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2 ml-1">Target URL</label>
            <input 
              type="text" 
              placeholder="https://example.com"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2 ml-1">Logic / Prompt</label>
            <textarea 
              rows="4"
              placeholder="Describe the automation steps..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button 
              onClick={onClose}
              className="px-6 py-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              className="px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
              style={{ backgroundColor: color, color: '#000' }}
            >
              Dispatch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;