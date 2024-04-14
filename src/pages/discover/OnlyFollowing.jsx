import React from "react";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "../home/home.scss";

export default function OnlyFollowing() {
    return (
        <>
            <div className="home">
                <h2>Only Following</h2>
                <Stories />
                <Share />
                <Posts contentType={"following-posts"} />
            </div>
        </>
    );
}
