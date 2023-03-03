import create from 'zustand';

type BearState = {
  bears: number;
  increase: (by: number) => void;
  removeAllBears: () => void;
};

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useBearStore;
