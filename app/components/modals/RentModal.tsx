'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

const RentModal = () => {
    const rentModal = useRentModal();
  return (

    <Modal 
    onClose={rentModal.onClose}
    onSubmit={rentModal.onClose}
    isOpen = {rentModal.isOpen}
    actionLabel="Submit"
    title="Airbnb your home!"
    />

  );
}

export default RentModal