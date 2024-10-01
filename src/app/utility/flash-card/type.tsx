interface Card {
  question: string,
  answer: string,
  score: number
}

interface Deck {
  id: number,
  name: string,
  cards: Card[]
}

interface FormValues {
  cards: string,
  isEncoded: boolean,
  name: string,
}

type TabName = 'decks' | 'add' | 'edit';

export type { Card, Deck, FormValues, TabName }

