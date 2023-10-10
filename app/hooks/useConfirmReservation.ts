import { create } from "zustand";

interface ConfirmReservation {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmReservation = create<ConfirmReservation>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useConfirmReservation;