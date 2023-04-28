import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const location = useLocation();

  return (
    <Fragment>
      {loading === false && user ? (
        <Outlet />
      ) : (
        <>
          <Navigate to="/login" state={{ form: location }} replace />
        </>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
