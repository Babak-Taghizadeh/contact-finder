import { useEffect, useState, useCallback, useRef, memo } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchFieldProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  debounceDelay?: number;
}

const SearchField = ({
  onSearch,
  initialValue = "",
  debounceDelay = 400,
}: SearchFieldProps) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const debouncedQuery = useDebounce(query, debounceDelay);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search contacts..."
        className="search-input"
        aria-label="Search contacts"
      />
    </div>
  );
};

export default memo(SearchField);
