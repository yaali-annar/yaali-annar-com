import type { FC, PropsWithChildren } from 'react';

import Button from '../button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border border-yellow-400 bg-black rounded w-11/12 p-4 lg:p-6 relative">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button secondary className='rounded-full px-2' onClick={onClose}>
            &times;
          </Button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
