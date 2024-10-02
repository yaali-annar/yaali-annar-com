import type { FC } from "react";

import Button from "@/components/button";
import Modal from "@/components/modal";
import { useDecks } from "../engine";

interface DeleteConfirmationProps {
  afterDeletion: () => void;
  deletionId: number;
  setDeletionId: (deletionId: number) => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ afterDeletion, deletionId, setDeletionId }) => {
  const { deleteDeck } = useDecks();

  const close = () => setDeletionId(0)
  const performDeletion = () => {
    deleteDeck(deletionId)
    close();
    afterDeletion();
  }

  return (
    <Modal isOpen={deletionId > 0} onClose={close} title="Delete Deck?">
      <div className="flex gap-4 lg:gap-6">
        <Button primary onClick={close}>Cancel</Button>
        <Button secondary onClick={performDeletion}>Delete</Button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmation