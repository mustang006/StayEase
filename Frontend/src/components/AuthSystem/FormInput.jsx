import React from 'react';

const FormInput = React.forwardRef(({ id, type, placeholder, icon, ...rest }, ref) => (
  <div className="relative mb-6">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A8C5FF]/70">{icon}</span>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      ref={ref}
      {...rest}
      className="w-full pl-10 pr-4 py-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5A80E9] transition-all duration-300"
    />
  </div>
));

export default FormInput;
