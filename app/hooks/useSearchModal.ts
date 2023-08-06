import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface SearchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useSearchModal = create<SearchModalStore>((set) =>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),

}));

export default useSearchModal;