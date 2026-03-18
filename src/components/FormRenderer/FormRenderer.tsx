import { CheckCircle2 } from "lucide-react";
import { FormSchema } from "../../config/formSchema";
import { InferredFormValues } from "../../utils/schemaBuilder";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { useFormRenderer } from "./useFormRenderer";
import { cn } from "../../lib/cn";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: InferredFormValues) => void;
}

export function FormRenderer({ schema, onSubmit }: FormRendererProps) {
  const {
    form,
    isFieldVisible,
    handleSubmit,
    handleReset,
    isSubmitting,
    isSubmitSuccessful,
  } = useFormRenderer(schema, onSubmit);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {schema.fields.map((field) => {
          if (!isFieldVisible(field.name)) return null;

          return (
            <div
              key={field.name}
              className={cn(field.type === "checkbox" && "sm:col-span-2")}
            >
              <FormFieldRenderer
                field={field}
                control={form.control}
                error={form.formState.errors[field.name]?.message as string | undefined}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add User"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Reset
        </button>

        {isSubmitSuccessful && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            User added successfully
          </span>
        )}
      </div>
    </form>
  );
}
