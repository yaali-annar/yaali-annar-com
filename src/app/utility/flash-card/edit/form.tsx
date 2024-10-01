import { useMemo, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

import { useDecks } from "../data";
import type { Card, Deck, FormValues } from "../type";

interface EditFormProps {
  deck: Deck;
}

const EditForm: FC<EditFormProps> = ({ deck: selectedDeck }) => {
  const router = useRouter();

  const [decks, setDecks] = useDecks();

  const cardString = useMemo(() => {
    if (!selectedDeck) {
      return ''
    }
    return selectedDeck.cards.map(({ question, answer, score }) => [question, answer, score].join("\t")).join("\n")
  }, [selectedDeck])

  const methods = useForm<FormValues>({
    defaultValues: {
      name: selectedDeck.name,
      cards: cardString
    }
  })

  const onSubmit: SubmitHandler<FormValues> = ({ name, cards: cardsString }) => {
    const cards: Card[] = cardsString.split(/[\n\r]/).map(line => {
      const [question, answer, scoreString] = line.split(/\t/);
      return { question, answer, score: +scoreString }
    })

    const newDecks = [...decks].map(deck => {
      if (deck.id === selectedDeck.id) {
        return { ...selectedDeck, name, cards }
      }
      return deck
    })

    setDecks(newDecks);
    router.refresh();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput label="Name" name="name" />
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
