import { z } from "zod";
import { FormSchema, FormField } from "../config/formSchema";

export type InferredFormValues = Record<string, string | number | boolean | undefined>;

function buildFieldSchema(field: FormField): z.ZodTypeAny {
  switch (field.type) {
    case "text": {
      const s = z.string();
      return field.required ? s.min(1, `${field.label} is required`) : s.optional();
    }
    case "number": {
      let s = z.coerce.number({ message: `${field.label} must be a number` });
      if (field.min !== undefined) s = s.min(field.min, `Minimum is ${field.min}`);
      if (field.max !== undefined) s = s.max(field.max, `Maximum is ${field.max}`);
      return field.required ? s : s.optional();
    }
    case "select": {
      const s = z.string();
      return field.required ? s.min(1, `${field.label} is required`) : s.optional();
    }
    case "checkbox":
      return z.boolean().optional();
    case "date": {
      const s = z.string();
      return field.required ? s.min(1, `${field.label} is required`) : s.optional();
    }
  }
}

export function buildZodSchema(schema: FormSchema): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};
  for (const field of schema.fields) {
    shape[field.name] = buildFieldSchema(field);
  }
  return z.object(shape);
}

export function buildDefaultValues(schema: FormSchema): InferredFormValues {
  const defaults: InferredFormValues = {};
  for (const field of schema.fields) {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    } else if (field.type === "checkbox") {
      defaults[field.name] = false;
    } else {
      defaults[field.name] = field.type === "number" ? undefined : "";
    }
  }
  return defaults;
}
