import { useMemo, type FC } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import Select from "@/components/select";

import { useDecks } from "../data";
import type { Deck } from "../type";
import EditForm from "./form";
import Tabs from "../components/tabs";


const EditComponent: FC = () => {
  const searchParams = useSearchParams();
  const deckId = +(searchParams.get("deck") || "0");

  const [decks] = useDecks();
  const pathname = usePathname();
  const router = useRouter();

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
      {!selectedDeck && <>
        <Tabs selectedTab="edit" />
        <Select
          label="Select a Deck"
          value={deckId}
          options={deckOptions}
          onChange={(event) => selectDeck(event.target.value)}
        />
      </>}
      {selectedDeck && (
        <>
          <Link className="btn btn-secondary" href={pathname}>Go Back</Link>
          <h2>{selectedDeck.name}</h2>
          <EditForm deck={selectedDeck} />
        </>
      )}
    </div>
  );
};

export default EditComponent;
