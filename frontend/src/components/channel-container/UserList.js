import { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div>User</div>
        <div>Invite</div>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUser) => [...prevUser, user.id]);
    }
    setSelected((prevState) => !prevState);
  };

  return (
    <div className="user-item-wrapper" onClick={handleSelected}>
      <div className="user-item-user-info">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <div>{user.fullName || user.id}</div>
      </div>
      {selected ? (
        <button className="user-item-selected"></button>
      ) : (
        <button className="user-item-notSelected"></button>
      )}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const { client } = useChatContext();
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div>Error loading, please refresh and try again.</div>;
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div>No users found</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="user-item-container">
          {users?.map((user) => {
            return (
              <UserItem
                user={user}
                key={user.id}
                setSelectedUsers={setSelectedUsers}
              />
            );
          })}
        </div>
      )}
    </ListContainer>
  );
};

export default UserList;
