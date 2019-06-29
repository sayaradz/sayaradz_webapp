import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import getFallbackPage from "../../utils/getFallbackPage";

const PrivateRoute = props => {
  return (
    <Route
      {...props.rest}
      render={arg => {
        // User not authenticated => redirect to Login page
        if (!props.auth.isAuthenticated) {
          return <Redirect to="/login" />;
        }

        // User authenticated => check role => can access the component or not

        // User role has no access right to component
        //  => redirect to fallback page
        if (!props.roles.includes(props.auth.user.role)) {
          return <Redirect to={getFallbackPage(props.auth.user.role)} />;
        }

        // User has access right to access component
        return <props.component {...arg} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
