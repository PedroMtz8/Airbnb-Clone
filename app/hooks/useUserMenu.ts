import { RefObject } from 'react';
import { create } from "zustand";

interface UserMenuModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
}

const useUserMenu = create<UserMenuModal>((set) => ({
  isOpen: false,
  modalRef: { current: null },
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUserMenu;