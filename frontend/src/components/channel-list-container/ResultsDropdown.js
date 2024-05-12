import { Avatar, useChatContext } from "stream-chat-react";

const SearchResult = ({ channel, type, setChannel }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === "channel") {
    return (
      <div
        onClick={() => {
          setChannel(channel);
        }}
        className="search-result-container"
      >
        # {channel.data.name}
      </div>
    );
  }

  const channelByUser = async (
    client,
    setActiveChannel,
    channel,
    setChannel
  ) => {
    const filters = {
      type: "messaging",
      member_count: 2,
      members: { $eq: [client.user.id, client.userID] },
    };

    const [existingChannel] = await client.queryChannels(filters);

    if (existingChannel) return setActiveChannel(existingChannel);

    const newChannel = client.channel("messaging", {
      members: [channel.id, client.userID],
    });

    setChannel(newChannel);

    return setActiveChannel(newChannel);
  };

  return (
    <div
      onClick={async () => {
        channelByUser(client, setActiveChannel, channel, setChannel);
      }}
      className="search-result-container"
    >
      <div className="search-result-user">
        <Avatar
          image={channel.image || undefined}
          name={channel.name}
          size={24}
        />
        <div>{channel.name}</div>
      </div>
    </div>
  );
};

const ResultsDropdown = ({
  teamChannels,
  directChannels,
  loading,
  setChannel,
}) => {
  return (
    <div className="search-results-wrapper">
      <div className="search-results-header">Channels</div>
      {loading && !teamChannels.length && (
        <div className="search-results-state">
          <i>Loading...</i>
        </div>
      )}
      {!loading && !teamChannels.length ? (
        <div className="search-results-state">
          <i>No channels found</i>
        </div>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            key={i}
            setChannel={setChannel}
            type="channel"
          />
        ))
      )}
      <div className="search-results-header">Users</div>
      {loading && !directChannels.length && (
        <div className="search-results-state">
          <i>Loading...</i>
        </div>
      )}
      {!loading && !directChannels.length ? (
        <div className="search-results-state">
          <i>No direct messages found</i>
        </div>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            key={i}
            setChannel={setChannel}
            type="user"
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;
