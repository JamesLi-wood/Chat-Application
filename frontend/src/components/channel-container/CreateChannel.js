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

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID] || "");
  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState({ state: false, message: "" });

  const channelCreation = async (e) => {
    e.preventDefault();

    if (createType == "team" && !channelName) {
      setError({ ...error, state: true, message: "Channel name is empty" });
      return;
    }

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (err) {
      setError({
        ...error,
        state: true,
        message: "You need at least 2 members to create a channel.",
      });
    }
  };

  return (
    <div className="create-channel-container">
      <div className="create-channel-header">
        <div>
          {createType == "team" ? "Create a New Channel" : "Direct Messaging"}
        </div>
        <button onClick={() => setIsCreating(false)}>x</button>
      </div>
      {createType == "team" && (
        <ChannelNameInput setChannelName={setChannelName} />
      )}
      {error.state && (
        <div className="create-channel-error">{error.message}</div>
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <button className="create-channel-button" onClick={channelCreation}>
        {createType == "team" ? "Create Channel" : "Create Message Group"}
      </button>
    </div>
  );
};

export default CreateChannel;
