import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  channel,
  type,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <div>
      # {channel?.data?.name || channel?.data?.id}
    </div>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-preview-item">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <div>{members[0]?.user?.fullName}</div>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id == activeChannel?.id
          ? "channel-preview-wrapper-selected"
          : "channel-preview-wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
      }}
    >
      {type == "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
