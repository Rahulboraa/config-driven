# Config-Driven React App

A configuration-driven React application that renders dynamic forms and data tables entirely from JSON schemas. No hardcoded field UI in any core component.

Live Demo: https://config-driven.vercel.app/

## Tech Stack

| Layer        | Library                                 |
| ------------ | --------------------------------------- |
| UI Framework | React 18 + TypeScript (strict)          |
| Styling      | Tailwind CSS v3 + CSS custom properties |
| Form Engine  | React Hook Form + Zod v3                |
| Table Engine | TanStack React Table v8                 |
| State        | Zustand                                 |

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
│   ├── formSchema.ts
│   └── tableConfig.ts
├── components/
│   ├── FormRenderer/
│   │   └── FormRenderer.tsx
│   └── DataTable/
│       └── DataTable.tsx
├── store/
│   └── userStore.ts
├── utils/
│   └── schemaBuilder.ts
└── App.tsx
```

## Features

### Dynamic Form

- Fully schema driven
- Zod runtime validation
- Conditional rendering
- Default values via schema
- Typed submit output

### Dynamic Table

- Schema driven columns
- Sorting + search
- Pagination
- Column visibility
- Custom renderers

## Design Decisions

**Config/schema separation**
No React imports inside config.

**Runtime Zod schema**
Validation lives in schema.

**Conditional fields**
Minimal condition engine.

**renderAs hint**
Extensible cell renderer system.

**Zustand state**
Avoid unnecessary re-renders.

**Strict TypeScript**
No `any` used anywhere.
