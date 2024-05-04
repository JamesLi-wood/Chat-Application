import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "..";
import { ChannelList } from "stream-chat-react";

const cookies = new Cookies();

const Sidebar = ({ logOut }) => (
  <div className="channel-list-sidebar">
    <div className="channel-list-sidebar-icon">
      <img src="" alt="logo" />
    </div>
    <div className="channel-list-sidebar-icon">
      <img src="" alt="logo" />
    </div>
    <div>
      <button onClick={logOut}>LOGOUT</button>
    </div>
  </div>
);

const ServerName = () => (
  <div className="channel-list-header">
    <div>MY SERVER IS A LONG NAME</div>
  </div>
);

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
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
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
