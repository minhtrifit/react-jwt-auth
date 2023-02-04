import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";

const Login = (props) => {
  const { handleSetAuth, setLogUsername, setLogPassword, handleLoginAccount } =
    props;
  return (
    <div className="login">
      <h1 className="title">Login Account</h1>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => {
              setLogUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLogPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="login-action">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleLoginAccount(e)}
          >
            Login
          </Button>
          <Link to="/register">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Link>
          {/* <Button
            variant="primary"
            type="button"
            onClick={(e) => {
              handleSetAuth();
            }}
          >
            Set Auth
          </Button> */}
          <Link to="/dashboard">
            <Button variant="primary" type="button">
              Dashboard
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
