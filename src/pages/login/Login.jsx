import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import axios from "axios";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        console.log(value);
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/user/login",
                {
                    username: inputs.username,
                    password: inputs.password,
                }
            );
            const token = response.data.token;
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: inputs.username,
                    password: inputs.password,
                })
            );
            navigate("/");
            console.log("login success", token);
        } catch (error) {
            console.error("Error submitting data:", error); // Handle error
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Connect Sphere</h1>
                    <p>
                        Where connections thrive, opportunities flourish, and
                        you're at the center of it all.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                        />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
