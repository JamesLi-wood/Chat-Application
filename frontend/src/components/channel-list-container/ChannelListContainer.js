import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "..";
import { ChannelList, useChatContext } from "stream-chat-react";

const cookies = new Cookies();

const Sidebar = ({ logOut }) => (
  <div className="channel-list-sidebar">
    <img className="channel-list-sidebar-icon" src="" alt="logo" />
    <div>
      <button className="channel-list-button" onClick={logOut}>LOGOUT</button>
    </div>
  </div>
);

const ServerName = () => (
  <div className="channel-list-header">
    <div>MY SERVER</div>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContainer = ({
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } };
  
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    window.location.reload();
  };

  return (
    <>
      <Sidebar logOut={logOut} />
      <div className="channel-list-wrapper">
        <ServerName />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
