import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, useMemo, useState } from "react";

import Select from "@/components/select";

import Button from "@/components/button";
import DeleteConfirmation from "../components/confirm-delete";
import Tabs from "../components/tabs";
import { useDecks } from "../engine";
import type { Deck } from "../type";
import EditForm from "./form";

const EditComponent: FC = () => {
  const { decks } = useDecks();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [deletionId, setDeletionId] = useState(0);

  const deckId = +(searchParams.get("deck") || "0");

  const selectedDeck: Deck | undefined = useMemo(() => {
    if (!deckId) {
      return;
    }
    return decks.find((deck) => deck.id === deckId);
  }, [deckId, decks]);

  const selectDeck = (newDeck: string) => router.push(`${pathname}?deck=${newDeck}`);

  const deckOptions = decks.map(({ id, name }) => ({ text: name, value: id }));
  deckOptions.unshift({ text: "-", value: 0 });

  return (
    <div className="space-y-4 lg:space-y-6">
      {!selectedDeck && (
        <>
          <Tabs selectedTab="edit" />
          <Select
            label="Select a Deck"
            value={deckId}
            options={deckOptions}
            onChange={(event) => selectDeck(event.target.value)}
          />
        </>
      )}
      {selectedDeck && (
        <>
          <Link href={pathname}>{'<'} Go Back</Link>
          <div className="flex justify-between items-center">
            <h2>{selectedDeck.name}</h2>
            <Button secondary onClick={() => setDeletionId(deckId)}>Delete</Button>
          </div>
          <hr />
          <EditForm deck={selectedDeck} />
        </>
      )}
      <DeleteConfirmation
        {...{ deletionId, setDeletionId }}
        afterDeletion={() => router.push(pathname)}
      />
    </div>
  );
};

export default EditComponent;
