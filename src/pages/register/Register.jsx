import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { AuthContext } from "../../context/authContext";
import { useState, useContext } from "react";
import axios from "axios";
const Register = () => {
    const { signup } = useContext(AuthContext);
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
        console.log("inside signup: ");
        console.log(inputs.username);
        console.log(inputs.password);
        try {
            console.log("inside try");
            const response = await axios.post(
                "http://localhost:3001/user/signup",
                {
                    username: inputs.username,
                    password: inputs.password,
                }
            );
            console.log("Submission successful:", response.data); 
            navigate("/login");
        } catch (error) {
            console.error("Error submitting data:", error); 
        }
    };

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Connect Sphere</h1>
                    <p>
                        Where connections thrive, opportunities flourish, and
                        you're at the center of it all.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
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
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
