import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Router>
          <Routes>
            <Route
              {...rest}
              render={(props) => {
                if (isAuthenticated === false) {
                  return <Navigate to="/login" replace />;
                }

                if (isAdmin === true && user.role !== "admin") {
                  return <Navigate to="/login" replace />;
                }

                return <Component {...props} />;
              }}
              >
              </Route>
          </Routes>
        </Router>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
