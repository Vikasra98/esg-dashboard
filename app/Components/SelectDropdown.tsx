"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  placeholder = "Select...",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        // className="w-full px-[30px] py-3.5 border-0 rounded-[10px] outline-none bg-white placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70]"

        className="w-full px-[30px] py-3.5 border-0 rounded-[10px] outline-none bg-white placeholder:text-[#607D70] placeholder:text-base text-base text-[#607D70] flex justify-between items-center cursor-pointer"
      >
        <span className="text-[#607D70]">
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#607D70]"
        >
          ▼
        </motion.span>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto z-10"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDropdown;
