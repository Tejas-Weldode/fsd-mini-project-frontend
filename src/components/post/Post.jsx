import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Post = ({ post }) => {
    const [input, incrementLikes] = useState({
        likes: 0,
    });
    //TEMPORARY
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(post._id);
        const response = await axios.get(
            `http://localhost:3001/post/like/${post._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        incrementLikes((prevState) => ({
            ...prevState,
            likes: prevState.likes + 1,
        }));
        setLiked(true);
    };

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <div className="details">
                            <Link
                                to={`/profile/${post._id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span className="name">
                                    {post.uid.username}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{post.caption}</p>
                </div>
                <div className="info">
                    <div className="item" onClick={handleLike}>
                        {input.likes > post.likes ? input.likes : post.likes}{" "}
                        {liked ? (
                            <FavoriteOutlinedIcon />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
