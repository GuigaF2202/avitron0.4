import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#00F0FF]/10 text-[#00F0FF] transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MdOutlineLanguage className="text-xl" />
        <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-black/90 backdrop-blur-md ring-1 ring-[#00F0FF]/20">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`
                  w-full text-left px-4 py-2 text-sm
                  ${i18n.language === code 
                    ? 'bg-[#00F0FF]/10 text-[#00F0FF]' 
                    : 'text-gray-300 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF]'
                  }
                  transition-colors
                `}
                role="menuitem"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
