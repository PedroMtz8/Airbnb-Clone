import { create } from 'zustand';
import { SafeListing } from '../types';

interface ListingContext {
  listingData: SafeListing | null;
  totalPrice: number | null;
  currentUser: any;
  onSubmit: null | (() => void);
  setListingData: (data: SafeListing) => void;
  setTotalPrice: (totalPrice: number) => void;
  setOnSubmit: (onSubmit: (() => void)) => void;
  setCurrentUser: (user: any) => void;
}

const useListing = create<ListingContext>((set) => ({
  listingData: null,
  totalPrice: null,
  onSubmit: null,
  currentUser: null,
  setListingData: (data: SafeListing) => set({ listingData: data }),
  setTotalPrice: (totalPrice: number) => set({ totalPrice }),
  setOnSubmit: (fn: () => void) => set({ onSubmit: fn }),
  setCurrentUser: (user: any) => set({ currentUser: user }),
}));

export default useListing;