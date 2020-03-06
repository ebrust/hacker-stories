import React from "react";

type SearchProps = {
  lastSearches: string[];
  onLastSearch: (searchTerm: string) => void;
};

const LastSearches = ({ lastSearches, onLastSearch }: SearchProps) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

export default LastSearches;
