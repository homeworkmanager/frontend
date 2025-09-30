import { useLayoutEffect, useRef, useState } from 'react';

const preventDropdown = 'data-prevent-dropdown';

type DropdownType<T extends HTMLElement = HTMLDivElement> = {
  menuRef: React.RefObject<T>;
  isOpen: boolean;
  action: { open: () => void; close: () => void; toggle: () => void };
  preventDropdown: string;
};

const useDropdown = <T extends HTMLElement = HTMLDivElement>() => {
  const menuRef = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(false);

  const action = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev)
  };

  useLayoutEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(`[${preventDropdown}]`)) return;

      if (isOpen && menuRef.current && !menuRef.current.contains(target)) {
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

  return { menuRef, isOpen, action, preventDropdown };
};

export { useDropdown, type DropdownType as DropDownType };
