# Config-Driven React App

A configuration-driven React application that renders dynamic forms and data tables entirely from JSON schemas. No hardcoded field UI in any core component.

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Form Engine | React Hook Form + Zod v3 |
| Table Engine | TanStack React Table v8 |
| State | Zustand |

## Getting Started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── config/
│   ├── formSchema.ts       # FormSchema type + userFormSchema definition
│   └── tableConfig.ts      # TableConfig type + userTableConfig + initialData
├── components/
│   ├── FormRenderer/
│   │   └── FormRenderer.tsx    # Renders any FormSchema — zero hardcoded fields
│   └── DataTable/
│       └── DataTable.tsx       # Renders any TableConfig — dynamic columns
├── store/
│   └── userStore.ts        # Zustand store — users array + addUser action
├── utils/
│   └── schemaBuilder.ts    # Converts FormSchema to Zod schema + default values
└── App.tsx                 # Wires form submit to store to table
```

## Features

### Dynamic Form
- All fields driven by userFormSchema in src/config/formSchema.ts
- Supported types: text, number, select, checkbox, date
- Required field validation via Zod (built at runtime from schema)
- Conditional field rendering — department field appears only when role === "Admin"
- Default values declared in schema, not in component
- Submit returns typed InferredFormValues; form auto-resets on success

### Dynamic Table
- All columns driven by userTableConfig in src/config/tableConfig.ts
- Sorting on all columns (click any header)
- Global search filter across all columns
- Column visibility toggle (Columns dropdown)
- Pagination with configurable page size (5 / 10 / 20)
- Custom cell rendering via renderAs hint in column config:
  - "boolean" renders Active/Inactive badge
  - "badge" renders Role badge with colour coding
  - "date" renders formatted date string

## Design Decisions

**Config/schema separation** — src/config/ contains zero React imports. Both FormRenderer and DataTable receive their config as props. Swapping a schema only touches the config file; core components are untouched.

**Runtime Zod schema from JSON** — buildZodSchema() walks FormSchema.fields and produces a z.object() at component mount. Validation rules (required, min, max) live in the schema, not scattered across useForm() calls.

**Conditional fields via condition key** — Each field optionally declares condition: { field, value }. FormRenderer watches all values via RHF's watch() and gates rendering. Intentionally minimal — extend to support operators if needed.

**renderAs hint in table config** — Column config carries an optional renderAs property. DataTable uses this to pick a cell renderer rather than branching on accessorKey. Adding a new render type only requires a new renderer function and a new renderAs value.

**Zustand over Context** — Avoids unnecessary re-renders of the form panel when table data updates. Store is also accessible outside the React tree.

**No any** — TypeScript strict mode on. InferredFormValues = Record<string, string | number | boolean | undefined> satisfies RHF's FieldValues constraint while staying explicit. TanStack Table is fully typed to UserRecord.
# config-driven
