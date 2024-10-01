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
  name: string,
  cards: string,
}

type TabName = 'decks' | 'add' | 'edit';

export type { Card, Deck, FormValues, TabName }

