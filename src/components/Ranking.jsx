import { useEffect, useState } from "react";
import { teamProperty } from "services/team";

const Ranking = () => {
  const [users, setUsers] = useState([]);

  const usersIds = teamProperty("stackOverflowId").join(";");

  const url = `https://api.stackexchange.com/2.3/users/${usersIds}?order=desc&sort=reputation&site=stackoverflow`;
  const fetchUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data.items);
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usersData = users.map((user) => {
    return (
      <div key={user.account_id}>
        <br />
        <img src={user.profile_image} alt={user.display_name}></img>
        <h1>{user.display_name}</h1>
        <h2>Reputation: {user.reputation}</h2>
        <hr />
      </div>
    );
  });

  return <div>{usersData.length === 0 ? <h1>No users</h1> : usersData}</div>;
};

export default Ranking;
