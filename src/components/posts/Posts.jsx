import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ contentType }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch data from the API endpoint
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.get(
                    `http://localhost:3001/post/${contentType}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // Set the fetched posts to the state
                setPosts(response.data);
                console.log("posts --> ", response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        // Call the fetchPosts function
        fetchPosts();
    }, [contentType]);

    return (
        <div className="posts">
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    );
};

export default Posts;
