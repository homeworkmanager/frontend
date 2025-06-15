import React from 'react';

const preventDropdown = 'data-prevent-dropdown';

const useDropdown = <T extends HTMLElement = HTMLDivElement>() => {
  const menuRef = React.useRef<T>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const action = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev)
  };

  React.useLayoutEffect(() => {
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

type DropdownType<T extends HTMLElement = HTMLDivElement> = {
  menuRef: React.RefObject<T>;
  isOpen: boolean;
  action: { open: () => void; close: () => void; toggle: () => void };
  preventDropdown: string;
};

export { useDropdown, type DropdownType as DropDownType };
