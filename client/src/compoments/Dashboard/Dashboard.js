import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Dashboard.css";

const Dashboard = (props) => {
  const { handleLogOut, user } = props;
  console.log(user);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-title">ID: {user.id}</p>
      <p className="dashboard-title">Username: {user.username}</p>
      <div className="dashboard-action">
        <Link to="/">
          <Button variant="primary" type="button">
            Back
          </Button>
        </Link>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleLogOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
