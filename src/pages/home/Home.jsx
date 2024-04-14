import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";
import { useState } from "react";

const Home = () => {
    const [contentType, setContentType] = useState("following-posts");
    const handleToggle = () => {
        setContentType((prevContentType) =>
            prevContentType === "public-posts"
                ? "following-posts"
                : "public-posts"
        );
    };
    return (
        <div className="home">
            <Stories />
            <Share />
            <label className="switch">
                Show public posts :
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    checked={contentType === "public-posts"}
                />
                <span className="slider round"></span>
            </label>
            <Posts contentType={contentType} />
        </div>
    );
};

export default Home;
