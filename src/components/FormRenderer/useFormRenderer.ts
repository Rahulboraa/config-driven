import { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../config/formSchema";
import { buildZodSchema, buildDefaultValues, InferredFormValues } from "../../utils/schemaBuilder";

export function useFormRenderer(schema: FormSchema, onSubmit: (data: InferredFormValues) => void) {
  const zodSchema = useMemo(() => buildZodSchema(schema), [schema]);
  const defaultValues = useMemo(() => buildDefaultValues(schema), [schema]);

  const form = useForm<InferredFormValues>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const watchedValues = form.watch();

  function isFieldVisible(fieldName: string): boolean {
    const field = schema.fields.find((f) => f.name === fieldName);
    if (!field?.condition) return true;
    return watchedValues[field.condition.field] === field.condition.value;
  }

  const submitHandler: SubmitHandler<InferredFormValues> = (data) => {
    onSubmit(data);
    form.reset(defaultValues);
  };

  return {
    form,
    isFieldVisible,
    handleSubmit: form.handleSubmit(submitHandler),
    handleReset: () => form.reset(defaultValues),
    isSubmitting: form.formState.isSubmitting,
    isSubmitSuccessful: form.formState.isSubmitSuccessful,
  };
}
