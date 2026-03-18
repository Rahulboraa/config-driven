import { Controller, Control } from "react-hook-form";
import { FormField, SelectField } from "../../config/formSchema";
import { InferredFormValues } from "../../utils/schemaBuilder";
import {
  FieldWrapper,
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
  CheckboxInput,
} from "../ui/FormFields";

interface FormFieldRendererProps {
  field: FormField;
  control: Control<InferredFormValues>;
  error?: string;
}

export function FormFieldRenderer({ field, control, error }: FormFieldRendererProps) {
  const id = `field-${field.name}`;

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf }) => {
        if (field.type === "checkbox") {
          return (
            <CheckboxInput
              id={id}
              checked={!!rhf.value}
              onCheckedChange={rhf.onChange}
              label={field.label}
            />
          );
        }

        return (
          <FieldWrapper
            label={field.label}
            required={field.required}
            error={error}
            htmlFor={id}
          >
            {field.type === "text" && (
              <TextInput
                id={id}
                value={(rhf.value as string) ?? ""}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
                placeholder={field.placeholder}
                error={!!error}
              />
            )}

            {field.type === "number" && (
              <NumberInput
                id={id}
                value={(rhf.value as number) ?? ""}
                onChange={(e) => rhf.onChange(e.target.valueAsNumber)}
                onBlur={rhf.onBlur}
                min={field.min}
                max={field.max}
                error={!!error}
              />
            )}

            {field.type === "date" && (
              <DateInput
                id={id}
                value={(rhf.value as string) ?? ""}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
                error={!!error}
              />
            )}

            {field.type === "select" && (
              <SelectInput
                value={(rhf.value as string) ?? ""}
                onChange={rhf.onChange}
                options={(field as SelectField).options}
                error={!!error}
              />
            )}
          </FieldWrapper>
        );
      }}
    />
  );
}
