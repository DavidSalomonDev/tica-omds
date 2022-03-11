import { useEffect, useState } from "react";
import useFetch from "hooks/useFetch";

const Ranking = () => {
	const [users, setUsers] = useState([]);
	const url =
		"https://api.stackexchange.com/2.3/users/17311782?order=desc&sort=reputation&site=stackoverflow";

	const fetchUsers = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setUsers(data.items);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const usersData = users.map((user) => {
		return (
			<div key={user.account_id}>
				<img src={user.profile_image} alt={user.display_name}></img>
				<h1>{user.display_name}</h1>
				<h2>Reputation: {user.reputation}</h2>
			</div>
		);
	});

	return <div>{usersData.length === 0 ? <h1>No users</h1> : usersData}</div>;
};

export default Ranking;
