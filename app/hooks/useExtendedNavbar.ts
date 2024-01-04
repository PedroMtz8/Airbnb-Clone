import { create } from "zustand";

interface ExtendedNavbar {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useExtendedNavbar = create<ExtendedNavbar>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useExtendedNavbar;