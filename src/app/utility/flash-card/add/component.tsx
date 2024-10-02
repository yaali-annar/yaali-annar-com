"use client";

import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import CheckBox from "@/components/check-box";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

import { cardsExample } from "../data";
import { parseCardsString, switchCardFormat, useDecks } from "../engine";
import type { FormValues } from "../type";

const defaultValues: FormValues = {
  cards: cardsExample,
  isEncoded: false,
  name: "Example Deck",
};

const AddComponent: FC = () => {

  const { decks, addDeck } = useDecks();
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
    const cards = parseCardsString(cardsString, isEncoded);
    addDeck({ cards, name })
    methods.setValue("cards", '');
    methods.setValue("name", '');
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
        <CheckBox label="Is Encoded" name="isEncoded" onChange={async (event) => switchCardFormat(methods, event.target.checked)} />
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
