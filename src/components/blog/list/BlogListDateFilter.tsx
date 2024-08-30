import type { BlogFilterState } from "@/sanity/hooks/useBlogFilter";
import type { ChangeEventHandler } from "react";

interface Props {
  label: string;
  fromState: BlogFilterState["createdAfter" | "updatedAfter"];
  toState: BlogFilterState["createdBefore" | "updatedBefore"];
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}
export default function BlogListDateFilter({
  label,
  fromState,
  toState,
  onFromDateChange,
  onToDateChange,
}: Props) {
  const onFromChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onFromDateChange(event.target.value);
  };
  const onToChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onToDateChange(event.target.value);
  };

  return (
    <div className="flex gap-2">
      <p>From</p>
      <input
        onChange={onFromChange}
        type="date"
        value={fromState}
        className="text-black"
      />
      <p>to</p>
      <input
        onChange={onToChange}
        type="date"
        value={toState}
        className="text-black"
      />
    </div>
  );
}
