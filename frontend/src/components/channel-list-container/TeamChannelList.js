const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type == "team" ? (
      <div className="team-channel-list">
        <div className="team-channel-message">
          Connection error, please wait a moment and try again.
        </div>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <div className="team-channel-message">
          Loading {type == "team" ? "channels" : "messages"} ...
        </div>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list-header">
        <div className="team-channel-list-title">
          {type == "team" ? "Channels" : "Direct Messages"}
        </div>
        <button
          onClick={() => {
            setCreateType(type);
            setIsCreating((prevState) => !prevState);
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
