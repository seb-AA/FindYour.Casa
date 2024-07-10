import { create } from "zustand";
import { FieldValues } from "react-hook-form";

interface RentModalState {
  isOpen: boolean;
  mode: 'add' | 'edit';
  listing: FieldValues | null;
  onOpen: (mode: 'add' | 'edit', listing?: FieldValues | null) => void;
  onClose: () => void;
}

const useRentModal = create<RentModalState>((set) => ({
  isOpen: false,
  mode: 'add',
  listing: null,
  onOpen: (mode, listing = null) => set({ isOpen: true, mode, listing }),
  onClose: () => set({ isOpen: false, mode: 'add', listing: null }),
}));

export default useRentModal;
