import { create } from "zustand";
import { FieldValues } from "react-hook-form";

interface RentModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  listing?: FieldValues;
  onOpen: (mode?: "add" | "edit", listing?: FieldValues) => void;
  onClose: () => void;
}

const useRentModal = create<RentModalState>((set) => ({
  isOpen: false,
  mode: "add",
  listing: undefined,
  onOpen: (mode = "add", listing) => set({ isOpen: true, mode, listing }),
  onClose: () => set({ isOpen: false, mode: "add", listing: undefined }),
}));

export default useRentModal;
