import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, helperText, className, ...props }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className || ''}`}>
      <label className="text-sm font-semibold text-gray-300">
        {label} {props.required && <span className="text-[#10b981]">*</span>}
      </label>
      <textarea
        className="bg-[#1e293b] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all placeholder-gray-500 min-h-[100px]"
        {...props}
      />
      {helperText && <p className="text-xs text-gray-400 mt-1 leading-relaxed">{helperText}</p>}
    </div>
  );
};
