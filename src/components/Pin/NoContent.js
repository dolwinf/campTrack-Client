import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Context from "../../context";

import LandscapeIcon from "@material-ui/icons/Landscape";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExploreIcon from "@material-ui/icons/Explore";

const NoContent = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const { pins, currentPin, currentUser } = state;
  const handleClick = pin => {
    dispatch({ type: "SET_VIEWPORT", payload: pin });
    dispatch({ type: "SET_USERPOSITION", payload: pin });
    dispatch({ type: "SHOW_PIN_INFO", payload: pin });
    console.log(pin);
    console.log("Clicked pin", pin._id);
  };
  const authorPins = pins.filter(pin => pin.author._id === currentUser._id);
  return (
    <div className={classes.root}>
      <LandscapeIcon className={classes.icon} />
      <Typography
        component="h2"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <div
          style={{
            fontWeight: "bold",
            color: "darkblue",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "20px"
          }}
        >
          We all love camping. Tell us where you camped. Drag through the map
          and start pointing!
        </div>
      </Typography>
      {authorPins && (
        <List style={{ maxWidth: "100%" }}>
          <Typography align="center" gutterBottom>
            <ListItem>
              <ListItemText>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "darkblue",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "20px"
                  }}
                >
                  <div className={classes.recent}>
                    Camp sites you recently added:
                  </div>
                </div>
              </ListItemText>
            </ListItem>
          </Typography>
          <br></br>
          {authorPins.map((pin, i) => (
            <Typography>
              <ListItem key={i} alignItems="center" divider="true">
                <div className={classes.userPinIcon}>
                  <ExploreIcon />
                </div>

                <div
                  onClick={e => handleClick(pin)}
                  style={{
                    color: "darkblue",
                    fontFamily: "'Nunito', sans-serif"
                  }}
                >
                  {pin.title}
                </div>
              </ListItem>
            </Typography>
          ))}
        </List>
      )}
    </div>
  );
};

const styles = theme => ({
  recent: {
    fontFamily: "'Yanone Kaffeesatz', sans-serif",
    fontSize: "30px"
  },
  userPinIcon: {
    color: "#036534",
    marginRight: "7px"
  },
  pic: {
    width: "100%",
    height: "100%"
  },
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "top-center"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: "80px",
    color: "green"
  }
});

export default withStyles(styles)(NoContent);
