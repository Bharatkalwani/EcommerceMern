import React, { Fragment,useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate,Link } from "react-router-dom";
import ProfileImg from "../../images/Profile.png";
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile `}></MetaData>
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={ProfileImg} alt={user.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>

        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
