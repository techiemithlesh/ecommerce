import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
  const data = { email: "", password: "" };
  const [user, setUser] = useState(data);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/auth/login', user);
      Cookies.set('userData', JSON.stringify(response.data));

      toast.success("Login Successfully!", {
        position: 'top-right',
      });

      const userType = response.data.userType;

      if (userType === 'user') {
        history("/");
      } 

    } catch (error) {
      console.error('Login failed', error.response.data);

      toast.error(error.response.data.message || 'Login error!', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sigin-flex">
      <div className="sigin-left">
        <form onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            type="text"
            placeholder="Write your Email"
            onChange={handleChange}
            name="email"
            value={user.email}
          />
          <input
            autoComplete="off"
            type="password"
            placeholder="Write your Password"
            onChange={handleChange}
            name="password"
            value={user.password}
          />
          <button className="form-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Do you have an Account?{" "}
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <span>Sign up</span>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
