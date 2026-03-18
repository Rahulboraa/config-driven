export type FieldType = "text" | "number" | "select" | "checkbox" | "date";

interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string | number | boolean;
  condition?: { field: string; value: string | number | boolean };
}

export interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
  defaultValue?: string;
}

export interface NumberField extends BaseField {
  type: "number";
  min?: number;
  max?: number;
  defaultValue?: number;
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
  defaultValue?: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue?: boolean;
}

export interface DateField extends BaseField {
  type: "date";
  defaultValue?: string;
}

export type FormField = TextField | NumberField | SelectField | CheckboxField | DateField;

export interface FormSchema {
  fields: FormField[];
}

export const userFormSchema: FormSchema = {
  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      defaultValue: "",
      placeholder: "e.g. Jane Smith",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      min: 18,
      max: 100,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Admin", "Manager", "User"],
      defaultValue: "User",
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      options: ["Engineering", "Design", "Marketing", "HR", "Finance"],
      condition: { field: "role", value: "Admin" },
    },
    {
      name: "isActive",
      label: "Mark as active",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
    },
  ],
};
