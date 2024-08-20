import type {
  BlogFilterActions,
  BlogFilterState,
} from "@/sanity/hooks/useBlogFilter";
import type { ChangeEventHandler } from "react";

import BlogTag from "./BlogTag";

interface FilterSectionProps {
  children: React.ReactNode;
  label: string;
}
function FilterSection({ children, label }: FilterSectionProps) {
  return (
    <section className="border border-green-300 rounded-md m-2 p-2">
      <label>{label}</label>
      {children}
    </section>
  );
}

interface FilterTagProps {
  tag: string;
  removeTagFn: (tag: string) => void;
}
function FilterTag({ tag, removeTagFn }: FilterTagProps) {
  const onClick = () => removeTagFn(tag);
  return (
    <li key={tag}>
      <button onClick={onClick}>
        <BlogTag tag={tag} />
      </button>
    </li>
  );
}

interface TagFilterProps {
  label: string;
  state: BlogFilterState["includeTags" | "excludeTags"];
  removeFn: (tag: string) => void;
  resetFn: () => void;
}
function TagFilter({ label, state, removeFn, resetFn }: TagFilterProps) {
  return (
    <FilterSection label={label}>
      <button onClick={resetFn} className="bg-red-700 p-1 ml-2 rounded-md">
        X
      </button>
      {state ? (
        <ul className="flex flex-row gap-2">
          {state.map((tag) => (
            <FilterTag tag={tag} removeTagFn={removeFn} />
          ))}
        </ul>
      ) : null}
    </FilterSection>
  );
}

interface DateFilterProps {
  label: string;
  fromState: BlogFilterState["createdAfter" | "updatedAfter"];
  toState: BlogFilterState["createdBefore" | "updatedBefore"];
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}
function DateFilter({
  label,
  fromState,
  toState,
  onFromDateChange,
  onToDateChange,
}: DateFilterProps) {
  const onFromChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onFromDateChange(event.target.value);
  };
  const onToChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onToDateChange(event.target.value);
  };

  return (
    <FilterSection label={label}>
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
    </FilterSection>
  );
}

interface Props {
  filterState: BlogFilterState;
  filterActions: BlogFilterActions;
}
export default function BlogListFilter({ filterState, filterActions }: Props) {
  return (
    <div>
      <TagFilter
        label="Included Tags"
        state={filterState.includeTags}
        removeFn={filterActions.includeTags.remove}
        resetFn={filterActions.includeTags.unset}
      />
      <TagFilter
        label="Excluded Tags"
        state={filterState.excludeTags}
        removeFn={filterActions.excludeTags.remove}
        resetFn={filterActions.excludeTags.unset}
      />
      <DateFilter
        label="Created"
        fromState={filterState.createdAfter}
        toState={filterState.createdBefore}
        onFromDateChange={filterActions.createdAfter.set}
        onToDateChange={filterActions.createdBefore.set}
      />
      <DateFilter
        label="Updated"
        fromState={filterState.updatedAfter}
        toState={filterState.updatedBefore}
        onFromDateChange={filterActions.updatedAfter.set}
        onToDateChange={filterActions.updatedBefore.set}
      />
    </div>
  );
}
