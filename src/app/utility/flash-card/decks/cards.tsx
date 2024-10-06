import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { FC } from "react";

import Button from "@/components/button";
import GrowingText from "@/components/growing-text";
import { shuffleArray } from "@/utils/array";
import { classNames } from "@/utils/string";

import Select from "@/components/select";
import DeleteConfirmation from "../components/confirm-delete";
import { getRandomNumbers, useDecks } from "../engine";
import type { Deck } from "../type"

interface CardsProps {
  deck: Deck;
}

interface Answer {
  index: number;
  selected: boolean;
}

type Mode = 'normal' | 'reversed' | 'random';

const { floor, random, sqrt } = Math;

const modes = [
  { value: 'normal', text: 'Normal' },
  { value: 'reversed', text: 'Reversed' },
  { value: 'random', text: 'Random' }

]

const Cards: FC<CardsProps> = ({ deck: currentDeck }) => {
  const { editDeck } = useDecks();

  const pathname = usePathname();
  const router = useRouter();

  const [deletionId, setDeletionId] = useState(0);
  const [mode, setMode] = useState<Mode>('normal');
  const [options, setOptions] = useState<Answer[]>([]);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [shouldContinue, setShouldContinue] = useState(false);
  const [shouldReverse, setShouldReverse] = useState(false)
  const [started, setStarted] = useState(false);

  const { cards, name } = currentDeck;

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
    setShouldReverse(() => {
      switch (mode) {
        case "normal": return false;
        case "reversed": return true;
        case "random": return Math.random() > 0.5;
      }
    });
  }

  const start = () => {
    selectCard();
    setStarted(true);
  }

  const stop = () => {
    setOptions([]);
    setStarted(false);
    editDeck({ ...currentDeck, cards })
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
    cards[questionIndex].score += (correct ? 1 : -2);
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {!started && <>
        <Link href={pathname}>Go Back</Link>
      </>}
      <div className="flex justify-between items-center">
        <h2>{name}</h2>
        {!started &&
          <Button secondary type="button" onClick={() => setDeletionId(currentDeck.id)}>
            Delete
          </Button>
        }
        {started && <Select options={modes} value={mode} onChange={event => setMode(event.target.value as Mode)} />}
      </div>
      <hr />
      {!started &&
        <Button secondary type="button" onClick={start}>Start</Button>
      }
      {started && (
        <>
          <div className="border border-yellow-400 rounded flex justify-center py-16">
            <GrowingText text={cards[questionIndex][shouldReverse ? 'answer' : 'question']} />
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
                {cards[index][shouldReverse ? 'question' : 'answer']}
              </Button>
            ))}
          </div>
          <hr />
        </>
      )}
      <div className="flex justify-between">
        {started && <Button secondary type="button" onClick={stop}>Stop</Button>}
        {shouldContinue && <Button secondary type="button" onClick={next}>Next</Button>}
      </div>
      <DeleteConfirmation
        {...{ deletionId, setDeletionId }}
        afterDeletion={() => router.push(pathname)}
      />
    </div>
  )
};

export default Cards;