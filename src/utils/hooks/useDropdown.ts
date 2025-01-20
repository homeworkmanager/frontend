import React from 'react';

const useDropdown = <T extends HTMLElement = HTMLDivElement>() => {
  const menuRef = React.useRef<T>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const action = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev)
  };

  React.useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen]);

  return { menuRef, isOpen, action };
};

type DropdownType<T extends HTMLElement = HTMLDivElement> = {
  menuRef: React.RefObject<T>;
  isOpen: boolean;
  action: { open: () => void; close: () => void; toggle: () => void };
};

export { useDropdown, type DropdownType as DropDownType };
