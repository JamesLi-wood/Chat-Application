const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type == "team" ? (
      <div className="team-channel-list">
        <div>Connection error, please wait a moment and try again.</div>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <div>Loading {type == "team" ? "channels" : "messages"} ...</div>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list-header">
        <div>{type == "team" ? "Channels" : "Direct Messages"}</div>
        <button
          className="team-channel-button"
          onClick={() => {
            setCreateType(type);
            setIsCreating(true);
            setIsEditing(false);
          }}
        >
          +
        </button>
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
