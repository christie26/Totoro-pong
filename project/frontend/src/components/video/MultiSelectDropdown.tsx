import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button';

interface MultiSelectDropdownProps {
  selectedValues: string[];
  options: string[];
  icon?: React.ComponentType<any>;
  labelKey: string;
  translationPrefix?: string | null;
  clearable?: boolean;
  onUpdate: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedValues,
  options,
  icon: Icon,
  labelKey,
  translationPrefix,
  clearable = false,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelected(selectedValues);
  }, [selectedValues]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, value]
      : selected.filter(v => v !== value);
    setSelected(newSelected);
    onUpdate(newSelected);
  };

  const clearSelection = () => {
    setSelected([]);
    onUpdate([]);
  };

  const getLabel = (value: string) => {
    if (translationPrefix) {
      // Assume we have a translation function, but for now, just return value
      return value;
    }
    return value || 'No data';
  };

  return (
    <div className="relative w-auto">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 bg-default hover:bg-light-background border-dark-purple cursor-pointer p-xs rounded-sm border-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Icon && <Icon stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
        <p className="m-0 text-gray-900 opacity-100 font-medium text-sm leading-5">
          {labelKey}
        </p>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 z-10 mt-xs rounded-sm bg-white border border-gray-200 shadow-lg max-h-80 min-w-45 overflow-y-auto p-xs"
          style={{
            boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(16, 24, 40, 0.08) transparent',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((value, index) => (
            <div key={index} className="px-4 h-10 flex items-center gap-xs">
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  onChange={(e) => handleCheckboxChange(value, e.target.checked)}
                  className="m-0"
                />
                <span className="text-gray-900 opacity-100 font-medium text-sm leading-5">
                  {getLabel(value)}
                </span>
            </div>
          ))}
          {clearable && (
            <div className="px-4 h-10 flex items-center">
              <Button onClick={clearSelection}>
                Clear
              </Button>
            </div>
          )}
        </div>
      )} 
    </div>
  );
};

export default MultiSelectDropdown;