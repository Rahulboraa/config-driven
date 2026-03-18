import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/cn";

export function Label({ className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("text-sm font-medium text-gray-700 leading-none", className)}
      {...props}
    />
  );
}

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export function FieldWrapper({ label, required, error, children, htmlFor }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputBase = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 focus:border-brand-500 disabled:opacity-50";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(inputBase, error && "border-red-400 focus:ring-red-400", className)}
    {...props}
  />
));
TextInput.displayName = "TextInput";

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    type="number"
    className={cn(inputBase, error && "border-red-400 focus:ring-red-400", className)}
    {...props}
  />
));
NumberInput.displayName = "NumberInput";

export const DateInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    type="date"
    className={cn(inputBase, error && "border-red-400 focus:ring-red-400", className)}
    {...props}
  />
));
DateInput.displayName = "DateInput";

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: boolean;
}

export function SelectInput({ value, onChange, options, placeholder, error }: SelectInputProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        className={cn(
          inputBase,
          "flex items-center justify-between cursor-pointer",
          error && "border-red-400 focus:ring-red-400"
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? "Select an option"} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-50 min-w-[160px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-gray-400">
            <ChevronUp className="h-3 w-3" />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt}
                value={opt}
                className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-700 outline-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-gray-900 data-[state=checked]:text-brand-600 data-[state=checked]:font-medium"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2">
                  <Check className="h-3.5 w-3.5 text-brand-500" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText className="pl-4">{opt}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-gray-400">
            <ChevronDown className="h-3 w-3" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

interface CheckboxInputProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export function CheckboxInput({ id, checked, onCheckedChange, label }: CheckboxInputProps) {
  return (
    <div className="flex items-center gap-2.5 pt-1">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="h-4 w-4 rounded border border-gray-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Label htmlFor={id} className="cursor-pointer font-normal text-gray-600">
        {label}
      </Label>
    </div>
  );
}
