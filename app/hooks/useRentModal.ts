import { create } from "zustand";

interface RentModalState {
  isOpen: boolean;
  listing: any; // Use a proper type if you have one
  onOpen: () => void;
  onClose: () => void;
  setListing: (listing: any) => void; // Use a proper type if you have one
}

const useRentModal = create<RentModalState>((set) => ({
  isOpen: false,
  listing: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, listing: null }),
  setListing: (listing) => set({ listing }),
}));

export default useRentModal;
