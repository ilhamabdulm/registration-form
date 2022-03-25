import { useCallback, useState } from 'react';

const useModal = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    toggleModal: useCallback(
      (state) => setIsOpen((prev) => state || !prev),
      [setIsOpen]
    ),
  };
};

export default useModal;
