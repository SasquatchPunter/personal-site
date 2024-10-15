import type {
  BlogFilterActions,
  BlogFilterState,
} from "@/sanity/hooks/useBlogFilter";

import BlogListTagFilter from "./BlogListTagFilter";
import BlogListDateFilter from "./BlogListDateFilter";

interface FilterSectionProps {
  children: React.ReactNode;
}
function FilterSection({ children }: FilterSectionProps) {
  return (
    <section className="p-2 bg-base-2/50 border-base-2 border-2px flex flex-col gap-4">
      {children}
    </section>
  );
}

interface Props {
  filterState: BlogFilterState;
  filterActions: BlogFilterActions;
}
export default function BlogListFilter({ filterState, filterActions }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full mt-8 md:w-1/2 font-semibold text-base-1">
      <FilterSection>
        <BlogListTagFilter
          label="Included Tags"
          state={filterState.includeTags}
          removeFn={filterActions.includeTags.remove}
          resetFn={filterActions.includeTags.unset}
        />
        <BlogListTagFilter
          label="Excluded Tags"
          state={filterState.excludeTags}
          removeFn={filterActions.excludeTags.remove}
          resetFn={filterActions.excludeTags.unset}
        />
      </FilterSection>
      <FilterSection>
        <BlogListDateFilter
          label="Created"
          fromState={filterState.createdAfter}
          toState={filterState.createdBefore}
          onFromDateChange={filterActions.createdAfter.set}
          onToDateChange={filterActions.createdBefore.set}
        />
        <BlogListDateFilter
          label="Updated"
          fromState={filterState.updatedAfter}
          toState={filterState.updatedBefore}
          onFromDateChange={filterActions.updatedAfter.set}
          onToDateChange={filterActions.updatedBefore.set}
        />
      </FilterSection>
    </div>
  );
}
