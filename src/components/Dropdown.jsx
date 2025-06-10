

import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { useClickOutside } from '../hooks/useClickOutside';

function Dropdown({ options, selected, onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-left"
          >
            <span>{selected}</span>
            <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-violet-500 hover:text-white dark:text-gray-200 dark:hover:text-white"
                >
                  <span>{option}</span>
                  {selected === option && <FiCheck />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;