import { useMemo, type FC } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Select from "@/components/select";

import { useDecks } from "../data";
import type { Deck } from "../type";
import Cards from "./cards";
import Tabs from "../components/tabs";

const DecksComponent: FC = () => {
  const searchParams = useSearchParams();

  const [decks] = useDecks();
  const pathname = usePathname();
  const router = useRouter();

  const deckId = +(searchParams.get("deck") || "0");

  const selectedDeck: Deck | undefined = useMemo(() => {
    if (!deckId) {
      return;
    }
    return decks.find((deck) => deck.id === deckId);
  }, [deckId, decks]);

  const selectDeck = (deckId: number) =>
    router.push(`${pathname}?deck=${deckId}`);

  const deckOptions = decks.map(({ id, name }) => ({ text: name, value: id }));
  deckOptions.unshift({ text: "-", value: 0 });

  return (
    <div>
      {!selectedDeck && (
        <><Tabs selectedTab="decks" />
          <Select
            label="Select a Deck"
            value={deckId}
            options={deckOptions}
            onChange={(event) => selectDeck(+event.target.value)}
          />
        </>
      )}
      {selectedDeck && <Cards deck={selectedDeck} />}
    </div>
  );
};

export default DecksComponent;
