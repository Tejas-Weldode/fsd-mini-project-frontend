import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";

export default function Discover() {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        return async () => {
            const rawUsers = await axios.get("http://localhost:3001/user/get");
            setUsers(rawUsers.data.users);
            const res = await axios.get(
                "http://localhost:3001/network/following",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("following data", res.data);
            res.data.forEach((e) => {
                setFollowedUsers([...followedUsers, e._id]);
            });
        };
    }, []);

    const handleFollow = async (id) => {
        console.log(id, token);
        const res = await axios.post(
            "http://localhost:3001/network/follow-unfollow",
            {
                uid: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("response of follow-unfollow ---> ", res.data);
        if (followedUsers.includes(id)) {
            // unfollowed
            const newFollowedUsers = followedUsers.filter((e) => e !== id);
            setFollowedUsers(newFollowedUsers);
        } else {
            // followed
            setFollowedUsers([...followedUsers, id]);
        }
    };

    return (
        <div className="big">
            <h1>Discover</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => handleFollow(user._id)}>
                                    {followedUsers.includes(user._id)
                                        ? "Unfollow"
                                        : "Follow"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
