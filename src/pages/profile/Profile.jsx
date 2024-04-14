import React from "react";
import "./profile.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import axios from "axios";
const Profile = () => {
    const [user, setUser] = useState({ username: "waiting" });
    const [showEdit, setShowEdit] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: "",
        password: "",
        bio: "",
        gender: "Male",
        notifyPostLike: false,
        notifyPostDislike: false,
        notifyPostComment: false,
        notifyCommentLike: false,
        notifyCommentDislike: false,
        notifyMessages: false,
        onlySeeImp: false,
    });

    useEffect(() => {
        return () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // console.log(name);
        // console.log(value);

        if (type === "checkbox") {
            setInputs((values) => ({ ...values, [name]: checked }));
        } else {
            setInputs((values) => ({ ...values, [name]: value }));
        }
        console.log(inputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle form submission
        console.log(inputs);
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await axios.put(
                "http://localhost:3001/user/edit-profile",
                {
                    fullName: inputs.fullName,
                    password: inputs.password,
                    bio: inputs.bio,
                    gender: inputs.gender,
                    profilePic: "",
                    notifyPostLike: inputs.notifyPostLike,
                    notifyPostDislike: inputs.notifyPostDislike,
                    notifyPostComment: inputs.notifyPostComment,
                    notifyCommentLike: inputs.notifyCommentLike,
                    notifyCommentDislike: inputs.notifyCommentDislike,
                    notifyMessages: inputs.notifyMessages,
                    onlySeeImp: inputs.onlySeeImp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error("Error submitting data:", error); // Handle error
        }
        setShowEdit(!showEdit);
        window.alert("Changes successfully saved");
    };

    const toggleEdit = () => {
        setShowEdit(!showEdit);
    };

    return (
        <div className="profile">
            <div className="images">
                {/* Profile images */}
                <img
                    src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="cover"
                />
                <img
                    src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt=""
                    className="profilePic"
                />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left"></div>
                    <div className="center">
                        <span>{user.username}</span>
                    </div>
                    <div className="right">
                        <Link to="/login">
                            <LogoutIcon />
                        </Link>
                        <MoreVertIcon />
                    </div>
                </div>
                <Button onClick={toggleEdit}>
                    {showEdit ? "Close Edit" : "Edit Profile"}
                </Button>
                {showEdit && (
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fullName">
                                    <Form.Label>fullName</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={inputs.fullName || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={inputs.password || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="bio">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="bio"
                                        value={inputs.bio || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        label="Male"
                                        value="male"
                                        checked={inputs.gender === "male"}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        label="Female"
                                        value="female"
                                        checked={inputs.gender === "female"}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        id="other"
                                        label="Other"
                                        value="other"
                                        checked={inputs.gender === "other"}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Label>Notification settings</Form.Label>

                                <Form.Check
                                    type="checkbox"
                                    name="onlySeeImp"
                                    label="See only important posts."
                                    onChange={handleChange}
                                />
                                <input type="submit" value="Save" />
                            </Form>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;
