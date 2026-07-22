import { Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Account 🚀</h1>
        <p>Join StudyNest and start your learning journey.</p>

        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;