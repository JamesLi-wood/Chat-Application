import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { ResultsDropdown } from "..";

const ChannelSearch = () => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.user.id] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery("");
    }
  };

  return (
    <div className="channel-search-container">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
