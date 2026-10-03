import { useState } from "react";

const Search = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();

        await onSearch(input);
    };

    const clearSearch = () => {
        setInput("");
        onSearch("");
    };

    return (
        <form
            className="search__form"
            onSubmit={submitHandler}
        >
            <span
                className="search__icon"
                aria-hidden="true"
            >
                ⌕
            </span>

            <input
                type="search"
                placeholder="Search for a country..."
                value={input}
                onChange={(event) =>
                    setInput(event.target.value)
                }
                aria-label="Search for a country"
                autoComplete="off"
            />

            {input && (
                <button
                    type="button"
                    className="search__clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}

            <button
                type="submit"
                className="search__submit"
            >
                Search
            </button>
        </form>
    );
};

export default Search;