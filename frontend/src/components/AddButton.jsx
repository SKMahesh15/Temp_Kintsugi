import React from 'react';
import { HiOutlinePlus } from "react-icons/hi2";

const AddButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative w-[180px] h-[48px] cursor-pointer flex items-center
                 border border-[rgba(99,255,180,0.25)] bg-[#0a0f0c] rounded-xl overflow-hidden
                 shadow-[3px_3px_0px_#00c97a] transition-all duration-150
                 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none outline-none"
    >
      <span
        className="absolute right-[-20px] top-1/2 -translate-y-1/2
                   w-[60px] h-[60px] rounded-full opacity-60 pointer-events-none
                   transition-all duration-[400ms] ease-in-out
                   group-hover:right-[-10px] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(0,201,122,0.35) 0%, transparent 70%)' }}
      />

      <span
        className="relative z-10 pl-[18px] text-[13px] font-semibold text-[#b6ffd9] tracking-[0.01em]
                   transition-all duration-200
                   group-hover:opacity-0 group-hover:-translate-x-2"
      >
        {text}
      </span>

      <span
        className="absolute right-0 z-10 h-full w-[46px] flex items-center justify-center
                   border-l border-[rgba(0,201,122,0.3)]
                   transition-all duration-[1000ms] ease-in-out
                   group-hover:w-full group-hover:border-l-0"
      >
        <HiOutlinePlus
          className="text-[#00c97a] text-[18px]
                     transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     group-hover:text-white group-hover:scale-125 group-hover:rotate-90"
        />
      </span>
    </button>
  );
};

export default AddButton;