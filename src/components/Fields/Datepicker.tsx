import { useMemo } from "react";
import { FormControl, FormHelperText, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { format, formatISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useField } from "formik";
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/Shadcn/button"
import { Calendar } from "@/components/Shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Shadcn/popover"

interface Props {
  id: string;
  label: string;
  helpText?: string;
  isRequired?: any;
  isCollapsed?: boolean;
}

export default function CustomDatePicker({ id, label, helpText, isRequired, isCollapsed }: Props): JSX.Element {
  const [field, meta, helpers] = useField(id);
  const selected = useMemo(() => field.value ? new Date(field.value) : new Date(), [field.value])

  const handleChange = (date?: Date) => {
    if (date) {
      helpers.setValue(formatISO(date, { representation: 'date' }));
    }
  };

  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !selected && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selected ? format(selected, 'PPP', { locale: fr }) : <span>Séléctionner une date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                locale={fr}
                mode="single"
                selected={selected}
                onSelect={handleChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormErrorMessage>{meta.error}</FormErrorMessage>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
