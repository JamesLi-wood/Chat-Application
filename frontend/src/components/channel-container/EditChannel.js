import { useState } from "react";
import { UserList } from "..";
import { useChatContext } from "stream-chat-react";

const ChannelNameInput = ({ setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className="create-channel-input">
      <div>Name</div>
      <input type="text" placeholder="channel-name" onChange={handleChange} />
      <div>Add Members</div>
    </div>
  );
};

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState({ state: false, message: "" });

  const updateChannel = async (e) => {
    e.preventDefault();

    if (!channelName && selectedUsers.length == 0) {
      setError({
        ...error,
        state: true,
        message: "Channel name empty and users not selected",
      });
      return;
    }

    const nameChange = channelName !== channel.data.name;
    if (nameChange) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName("");
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <div className="create-channel-container">
      <div className="create-channel-header">
        <div>Edit Channel</div>
        <button
          className="create-channel-header-button"
          onClick={() => setIsEditing(false)}
        >
          x
        </button>
      </div>
      <ChannelNameInput setChannelName={setChannelName} />
      {error.state && (
        <div className="create-channel-error">{error.message}</div>
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <button className="create-channel-button" onClick={updateChannel}>
        Save Changes
      </button>
    </div>
  );
};

export default EditChannel;
