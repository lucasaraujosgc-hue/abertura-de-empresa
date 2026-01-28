import React from 'react';
import { CalculatorIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#020a1c]/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section adapted from snippet */}
        <a href="/" className="flex items-center space-x-4 cursor-pointer group">
          <div className="w-12 h-12 bg-[#0f172a] rounded-xl border border-white/10 flex items-center justify-center text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-transform group-hover:scale-105">
            <CalculatorIcon className="w-8 h-8" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-3xl font-bold text-white tracking-tight leading-none mb-0.5">Vírgula</span>
            <span className="text-base font-semibold text-[#10b981] tracking-widest leading-none uppercase">Contábil</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
