import createPersistedStateContext from "@/app/context/persisted-state";
import { decodeData, encodeData } from "@/utils/codec";
import type { UseFormReturn } from "react-hook-form";
import { entryKey } from "./data";
import type { Card, Deck, FormValues } from "./type";

const getRandomNumbers = (max: number, amount = 3): number[] => {
  const availableNumbers = Array.from({ length: max }, (_, i) => i);
  const selectedNumbers: number[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selected = availableNumbers.splice(randomIndex, 1)[0];
    selectedNumbers.push(selected);
  }

  return selectedNumbers;
};

const parseCardsString = (cardsString: string, isEncoded: boolean): Card[] => {
  if (isEncoded) {
    return decodeData<Card[]>(cardsString)
  }

  return cardsString.split(/[\n\r]/).map((line) => {
    const [question, answer, scoreString] = line.split(/\t/);
    return { question, answer, score: +scoreString };
  });
}

const stringifyCards = (cards: Card[], isEncoded: boolean): string => {
  if (isEncoded) {
    return encodeData(cards);
  }
  return cards.map(({ question, answer, score }) => [question, answer, score].join("\t")).join("\n")
}

const switchCardFormat = (methods: UseFormReturn<FormValues>, isEncoded: boolean) => {
  try {
    const cardsString = methods.getValues("cards");
    const cards = parseCardsString(cardsString, !isEncoded);
    methods.setValue("cards", stringifyCards(cards, isEncoded));
  } catch {
    methods.setValue("isEncoded", !isEncoded);
  }
}

const { PersistedStateProvider: DecksProvider, usePersistedStateContext } =
  createPersistedStateContext<Deck[]>(entryKey, []);

const useDecks = () => {
  const { state: decks, setPersistedState } = usePersistedStateContext();

  const addDeck = (newDeck: Omit<Deck, 'id'>) => {
    const ids = decks.map((deck) => deck.id || 0);
    const id = Math.max(decks.length, ...ids) + 1;
    decks.push({ ...newDeck, id });
    setPersistedState(decks);
  }

  const deleteDeck = (id: number) => {
    const newDecks = decks.filter(deck => deck.id !== id);
    setPersistedState(newDecks);
  }

  const editDeck = (newDeck: Deck) => {
    const newDecks = decks.map(deck => {
      if (deck.id === newDeck.id) {
        return newDeck
      }
      return deck
    })
    setPersistedState(newDecks);
  }


  return { addDeck, decks, deleteDeck, editDeck }
}

export { DecksProvider, getRandomNumbers, parseCardsString, stringifyCards, switchCardFormat, useDecks }