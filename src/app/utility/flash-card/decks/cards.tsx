import { useEffect, useState, type FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import GrowingText from "@/components/growing-text";
import Button from "@/components/button";
import { classNames } from "@/utils/string";
import { shuffleArray } from "@/utils/array";

import type { Deck } from "../type"
import { getRandomNumbers } from "../engine";
import { useDecks } from "../data";


interface CardsProps {
  deck: Deck;
}

interface Answer {
  index: number;
  selected: boolean;
}

const { floor, random, sqrt } = Math;

const Cards: FC<CardsProps> = ({ deck: currentDeck }) => {
  const [decks, setDecks] = useDecks();

  const pathname = usePathname();
  const router = useRouter();

  const { cards, id, name } = currentDeck;

  const [shouldContinue, setShouldContinue] = useState(false);
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [options, setOptions] = useState<Answer[]>([]);

  const selectCard = () => {
    cards.sort((a, b) => a.score - b.score);

    const newQuestionIndex = floor(random() * sqrt(cards.length));
    let randomNumbers = getRandomNumbers(cards.length - 1);

    randomNumbers = randomNumbers.map(num => num + 1);
    randomNumbers.unshift(0);
    randomNumbers = shuffleArray(randomNumbers);

    const newOptions = randomNumbers.map(index => ({
      index: (newQuestionIndex + index) % cards.length,
      selected: false
    }))

    setQuestionIndex(newQuestionIndex);
    setOptions(newOptions)
  }

  const start = () => {
    selectCard();
    setStarted(true);
  }

  const stop = () => {
    setOptions([]);
    setStarted(false);

    const newDecks = decks.map(deck => {
      if (deck.id === id) {
        return { ...deck, cards };
      }
      return deck;
    })

    setDecks(newDecks);
    router.push(pathname);
  }

  const next = () => {
    setShouldContinue(false);
    selectCard();
  }

  const selectAnswer = (index: number) => {
    const correct = index === questionIndex;

    setOptions(previousOptions => previousOptions.map(option => {
      option.selected = option.selected || option.index === index;
      return option;
    }))

    setShouldContinue(correct);
    cards[questionIndex].score += (correct ? 1 : -1);
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {!started && <>
        <Link href={pathname}>Go Back</Link>
        <hr />
      </>}
      <h2>{name}</h2>
      {started && (
        <>
          <div className="border border-yellow-400 rounded flex justify-center py-16">
            <GrowingText text={cards[questionIndex].question} />
          </div>
          <div><small>Score: {cards[questionIndex].score}</small></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {options.map(({ index, selected }) => (
              <Button
                secondary={!selected}
                type="button"
                key={index}
                className={classNames({
                  "text-black": selected,
                  "bg-red-400": selected && questionIndex !== index,
                  "bg-green-400": selected && questionIndex === index
                })}
                onClick={() => {
                  if (!selected && !shouldContinue) {
                    selectAnswer(index)
                  }
                }}
              >
                {cards[index].answer}
              </Button>
            ))}
          </div>
          <hr />
        </>
      )}
      <div className="flex justify-between">
        {started ?
          <Button secondary type="button" onClick={stop}>Stop</Button> :
          <Button secondary type="button" onClick={start}>Start</Button>
        }
        {shouldContinue &&
          <Button secondary type="button" onClick={next}>Next</Button>
        }
      </div>
    </div>
  )
};

export default Cards;