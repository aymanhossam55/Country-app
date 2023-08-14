import React, { useState } from "react";

const Search = ({ onSearch }) => {

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input);
  };

  const [input, setInput] = useState("");

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search For a country......"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;