import { useRouter } from "next/navigation";
import { type FC, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

import CheckBox from "@/components/check-box";
import { decodeData, encodeData } from "@/utils/codec";
import { parseCardsString, stringifyCards, useDecks } from "../engine";
import type { Card, Deck, FormValues } from "../type";

interface EditFormProps {
  deck: Deck;
}

const EditForm: FC<EditFormProps> = ({ deck: selectedDeck }) => {
  const router = useRouter();
  const { editDeck } = useDecks();

  const cardsString = useMemo(() => {
    if (!selectedDeck) {
      return ''
    }
    return stringifyCards(selectedDeck.cards, false);
  }, [selectedDeck])

  const methods = useForm<FormValues>({
    defaultValues: {
      cards: cardsString,
      isEncoded: false,
      name: selectedDeck.name,
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({ name, cards: cardsString, isEncoded }) => {
    const cards = parseCardsString(cardsString, isEncoded)
    editDeck({ ...selectedDeck, name, cards });
    router.refresh();
  };

  const switchCardFormat = (isEncoded: boolean) => {
    const cardsString = methods.getValues("cards");
    const cards = parseCardsString(cardsString, !isEncoded);
    methods.setValue("cards", stringifyCards(cards, isEncoded));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput label="Name" name="name" />
        <CheckBox label="Is Encoded" name="isEncoded" onChange={async (event) => switchCardFormat(event.target.checked)} />
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

export default EditForm;
