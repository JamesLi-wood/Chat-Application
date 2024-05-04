import { useState, useEffect } from "react";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      // TODO: fetch channels
    } catch (error) {
      setQuery("");
    }
  };
  
  const handleChange = (e) => {
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <div className="channel-search-container">
      <input
        className="channel-search-input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default ChannelSearch;
