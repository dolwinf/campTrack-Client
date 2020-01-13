import React, { useContext } from "react";

import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../context";
import { ME_QUERY } from "../../graphql/queries";
import { BASE_URL } from "../../client";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  //If user login is successful we will be returned a google user
  const onSuccess = async googleUser => {
    //Grab the token from the google user returned
    const idToken = googleUser.getAuthResponse().id_token;
    // console.log({ idToken });

    //Instantiate a new GraphQL Client and pass the token as an authorization header.
    const client = new GraphQLClient(BASE_URL, {
      headers: { authorization: idToken }
    });

    //Make a request with the Authorization header using the request method and passing it the GQL query.
    //This request will be passed on and can be accessed in the context section of the Apollo server,
    //which we will then use to verify the idToken/header from the backend
    const data = await client.request(ME_QUERY);
    dispatch({ type: "LOGIN_USER", payload: data.me });
    dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
  };

  const onFailure = err => {
    console.log(`Error logging in ${err}`);
  };
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        paragraph
        noWrap
        style={{
          color: "#072074",
          fontFamily: "'Gloria Hallelujah', cursive"
        }}
      >
        Welcome to campTrack. Let's camp!
      </Typography>
      <GoogleLogin
        clientId="85277232229-ut6025mkmv9nbfr7e39l4kfc056fgm92.apps.googleusercontent.com"
        onSuccess={onSuccess}
        isSignedIn={true}
        onFailure={onFailure}
        theme="dark"
        buttonText="Login with Google"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#b2ff4d"
  }
};

export default withStyles(styles)(Login);
