"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

type SelectorProps<T> = {
  options: T[];
  value: string;
  onChange: (value: string) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder: string;
};

export default function Selector<T>({
  options,
  value,
  onChange,
  labelKey,
  valueKey,
  placeholder,
}: SelectorProps<T>) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full rounded-lg py-3 pl-4 pr-10 bg-darkBg font-inter font-normal text-2xl truncate"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={String(opt[valueKey])}>
            {String(opt[labelKey])}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white w-6 h-6">
        <ChevronDownIcon className="w-6 h-6 text-white" />
      </span>
    </div>
  );
}
