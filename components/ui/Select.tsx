import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className || ''}`}>
      <label className="text-sm font-semibold text-gray-300">
        {label} {props.required && <span className="text-[#10b981]">*</span>}
      </label>
      <select
        className="bg-[#1e293b] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all cursor-pointer appearance-none"
        {...props}
      >
        <option value="" disabled>Selecione uma opção</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
