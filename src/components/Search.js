import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { FaSearch } from "react-icons/fa";

import NextLink from "./Link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Search = () => {
  const ref = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const { data } = useSWR(query ? "/api/posts/search?q=" + query : null, fetcher);
  const results = data?.results;
  const handleChange = (event) => setQuery(event.target.value);
  const handleFocus = () => setActive(true);
  const handleClickInside = () => setActive(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={ref} className="w-full">
      <div className="search-content flex items-center space-x-2 px-3 py-1 sm:py-1 md:py-2 lg:py-2">
        <FaSearch color="gray" />
        <input
          type="search"
          placeholder="Search..."
          className="search-input w-full focus:outline-none"
          onChange={handleChange}
          onFocus={handleFocus}
          value={query}
        />
      </div>
      {active && results && results.length > 0 && (
        <div className="relative w-full">
          <ul className="search-result absolute z-10">
            {results.map(({ _id, title }) => (
              <li key={_id} className="px-4 py-2 text-sm leading-5 text-left cursor-pointer">
                <NextLink href={`/${_id}`} onClick={handleClickInside}>
                  <div className="search-result-click">{title}</div>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
