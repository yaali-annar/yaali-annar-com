"use client";

import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

import { cardsExample, useDecks } from "../data";
import type { Card, FormValues } from "../type";
import CheckBox from "@/components/check-box";
import { decodeData } from "@/utils/codec";

const defaultValues: FormValues = {
  cards: cardsExample,
  isEncoded: false,
  name: "Example Deck",
};

const AddComponent: FC = () => {
  const router = useRouter();
  const [decks, setDecks] = useDecks();
  const methods = useForm<FormValues>({ defaultValues });

  const onSubmit: SubmitHandler<FormValues> = ({
    cards: cardsString,
    isEncoded,
    name,
  }) => {
    const selectedDeck = decks.find((deck) => deck.name === name);
    if (selectedDeck) {
      return;
    }

    let cards: Card[] = [];

    if (isEncoded) {
      cards = decodeData<Card[]>(cardsString)
    } else {
      cards = cardsString.split(/[\n\r]/).map((line) => {
        const [question, answer, scoreString] = line.split(/\t/);
        return { question, answer, score: +scoreString };
      });
    }

    const ids = decks.map((deck) => deck.id || 0);
    const id = Math.max(decks.length, ...ids) + 1;

    decks.push({ id, cards, name });
    setDecks(decks);
    router.push(`/utility/flash-card/decks?deck=${id}`);
  };

  return (
    <FormProvider {...methods}>
      <p>
        Enter your cards separated by tab. Score will default to 0. The higher
        the score, the less frequent the card will appear. Alternatively you can
        also input the encoded deck. This is useful when you can't copy tab
        characters.
      </p>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput label="Name" name="name" />
        <CheckBox label="Is Encoded" name="isEncoded" />
        <TextArea allowTab label="Cards" name="cards" rows={10} />
        <input
          type="submit"
          value="Save"
          className="btn btn-primary w-full rounded-md cursor-pointer transition"
        />
      </form>
    </FormProvider>
  );
};

export default AddComponent;
