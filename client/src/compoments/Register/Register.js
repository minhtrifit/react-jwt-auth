import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";

const Register = (props) => {
  const { setRegUsername, setRegPassword, handleCreateAccount } = props;
  return (
    <div className="register">
      <h1 className="title">Register Account</h1>
      <Form className="register-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setRegUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setRegPassword(e.target.value)}
          />
        </Form.Group>
        <div className="register-action">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleCreateAccount(e);
            }}
          >
            Register
          </Button>
          <Link to="/">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
