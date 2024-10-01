import createPersistedStateContext from "@/app/context/persisted-state"
import type { Deck } from "./type";

const cardsExample =
  `Question 1	Answer 1	0
Question 2	Answer 2	0
Question 3	Answer 3	0
Question 4	Answer 4	0
Question 5	Answer 5	0
Question 6	Answer 6	0
Question 7	Answer 7	0
Question 8	Answer 8	0`

const entryKey = 'flash-card-decks'

const { PersistedStateProvider: DecksProvider, usePersistedStateContext } = createPersistedStateContext<Deck[]>(
  entryKey,
  []
);

const useDecks = (): [Deck[], (decks: Deck[]) => void] => {
  const { state, setPersistedState } = usePersistedStateContext();
  return [state, setPersistedState]
}

export { DecksProvider, useDecks, cardsExample, entryKey }