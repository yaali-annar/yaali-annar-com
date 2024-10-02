import { usePathname, useRouter } from "next/navigation";
import { type FC, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import CheckBox from "@/components/check-box";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

import { parseCardsString, stringifyCards, switchCardFormat, useDecks } from "../engine";
import type { Deck, FormValues } from "../type";

interface EditFormProps {
  deck: Deck;
}

const EditForm: FC<EditFormProps> = ({ deck: selectedDeck }) => {
  const pathname = usePathname();
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
    router.push(pathname)
  };

  return (
    <FormProvider {...methods}>
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

export default EditForm;
