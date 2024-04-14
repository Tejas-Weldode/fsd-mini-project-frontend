import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Share = () => {
    const [formData, setFormData] = useState({
        caption: "",
        visibility: "public",
        imp: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        try {
            const response = await axios.post(
                "http://localhost:3001/post/create",
                {
                    caption: formData.caption,
                    visibility: formData.visibility,
                    imp: formData.imp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
        setFormData({
            caption: "",
            visibility: "public",
            imp: false,
        });
        console.log(formData);
        window.alert("Post shared successfully");
    };

    const { currentUser } = useContext(AuthContext);
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={currentUser.profilePic} alt="" />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        name="caption"
                        value={formData.caption}
                        onChange={handleChange}
                        required
                    />
                </div>
                <hr />
                <div className="bottom">
                    <form onSubmit={handleSubmit}>
                        <div className="left">
                            <div className="item">
                                <label>Visibility:</label>
                                <select
                                    name="visibility"
                                    value={formData.visibility}
                                    onChange={handleChange}
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                            <div className="item">
                                <label>Important:</label>
                                <input
                                    type="checkbox"
                                    name="imp"
                                    checked={formData.imp}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <button type="submit">Share</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Share;
